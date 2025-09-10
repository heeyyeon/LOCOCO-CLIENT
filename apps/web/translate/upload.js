const {
  loadSpreadsheet,
  localesPath,
  getPureKey,
  lngs,
  sheetId,
  columnKeyToHeader,
} = await import('./index.js');

const headerValues = Object.values(columnKeyToHeader);
async function addNewSheet(doc, title, sheetId) {
  const sheet = await doc.addSheet({
    sheetId,
    title,
    headerValues,
  });

  return sheet;
}

async function updateTranslationsFromKeyMapToSheet(doc, keyMap) {
  const title = 'Your Sheet Title';
  let sheet = doc.sheetsById[sheetId];
  if (!sheet) {
    sheet = await addNewSheet(doc, title, sheetId);
  }

  const rows = await sheet.getRows();
  // find exsit keys
  const exsitKeys = {};
  const addedRows = [];
  rows.forEach((row) => {
    const key = row._rawData[0];
    if (keyMap[key]) {
      exsitKeys[key] = true;
    }
  });

  for (const [key, translations] of Object.entries(keyMap)) {
    if (!exsitKeys[key]) {
      const row = {
        [columnKeyToHeader.key]: key,
        ...Object.keys(translations).reduce((result, lng) => {
          const header = columnKeyToHeader[lng];
          if (header) {
            result[header] = translations[lng];
          }
          return result;
        }, {}),
      };
      addedRows.push(row);
    }
  }

  // upload new keys
  await sheet.addRows(addedRows);
}

function toJson(keyMap) {
  const json = {};

  Object.entries(keyMap).forEach(([__, keysByPlural]) => {
    for (const [keyWithPostfix, translations] of Object.entries(keysByPlural)) {
      json[keyWithPostfix] = {
        ...translations,
      };
    }
  });

  return json;
}

// 중첩된 객체를 평면화하는 함수
function flattenObject(obj, prefix = '') {
  const flattened = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // 중첩된 객체인 경우 재귀적으로 평면화
      Object.assign(flattened, flattenObject(value, newKey));
    } else {
      // 리프 노드인 경우
      flattened[newKey] = value;
    }
  }

  return flattened;
}

function gatherKeyMap(keyMap, lng, json) {
  // 중첩된 JSON을 평면화
  const flattenedJson = flattenObject(json);

  // message 파일 이름에서 .json 제거
  lng = lng.replace('.json', '');

  for (const [keyWithPostfix, translated] of Object.entries(flattenedJson)) {
    const key = getPureKey(keyWithPostfix);

    if (!keyMap[key]) {
      keyMap[key] = {};
    }

    const keyMapWithLng = keyMap[key];
    if (!keyMapWithLng[keyWithPostfix]) {
      keyMapWithLng[keyWithPostfix] = lngs.reduce((initObj, lang) => {
        initObj[lang] = '';
        return initObj;
      }, {});
    }

    keyMapWithLng[keyWithPostfix][lng] = translated;
  }
}

async function resetSheet() {
  const doc = await loadSpreadsheet();
  const sheet = doc.sheetsById[sheetId];
  sheet.clear();
}

async function addHeaderRowToSheet() {
  const doc = await loadSpreadsheet();
  const sheet = doc.sheetsById[sheetId];
  await sheet.setHeaderRow(headerValues);
}

async function updateSheetFromJson() {
  await resetSheet();
  await addHeaderRowToSheet();

  const doc = await loadSpreadsheet();
  const fs = await import('fs');
  fs.readdir(localesPath, (error, lngs) => {
    if (error) {
      console.log('readdir error');
      throw error;
    }

    const keyMap = {};

    lngs.forEach((lng) => {
      const localeJsonFilePath = `${localesPath}/${lng}`;

      // eslint-disable-next-line no-sync
      const json = fs.readFileSync(localeJsonFilePath, 'utf8');

      gatherKeyMap(keyMap, lng, JSON.parse(json));
    });

    updateTranslationsFromKeyMapToSheet(doc, toJson(keyMap));
  });
}

(async () => {
  await updateSheetFromJson();
})();
