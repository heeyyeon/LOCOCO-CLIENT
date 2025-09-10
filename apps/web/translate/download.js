// place in translate/download.js
//const mkdirp = require('mkdirp');
const {
  loadSpreadsheet,
  localesPath,
  ns,
  lngs,
  sheetId,
  columnKeyToHeader,
  NOT_AVAILABLE_CELL,
} = await import('./index.js');

// 언어 코드 → 숫자 매핑
// _rawData 인덱스 매핑 ex) _rowData=[key값, 한글, 영어, 스페인어]
const langToNumber = {
  ko: 1,
  en: 2,
  es: 3,
};

function getNumberByLang(lang) {
  return langToNumber[lang] ?? 0; // 매핑되지 않으면 0 리턴
}

// 평면화된 키를 중첩 객체로 변환하는 함수
function unflattenObject(flatObj) {
  const result = {};

  for (const [key, value] of Object.entries(flatObj)) {
    const keys = key.split('.');
    let current = result;

    // 마지막 키를 제외한 모든 키에 대해 중첩 객체 생성
    for (let i = 0; i < keys.length - 1; i++) {
      const currentKey = keys[i];
      if (!current[currentKey]) {
        current[currentKey] = {};
      }
      current = current[currentKey];
    }

    // 마지막 키에 값 할당
    const lastKey = keys[keys.length - 1];
    current[lastKey] = value;
  }

  return result;
}

async function fetchTranslationsFromSheetToJson(doc) {
  const sheet = doc.sheetsById[sheetId];
  if (!sheet) {
    return {};
  }

  const lngsMap = {};
  const rows = await sheet.getRows();
  // 각 언어별로 평면화된 객체를 먼저 생성
  const flatLngsMap = {};

  rows.forEach((row) => {
    const key = row._rawData[0];
    lngs.forEach((lng) => {
      const translation = row._rawData[getNumberByLang(lng)];
      // 번역과 관련없는 값은 빈 문자열로 처리 NOT_AVAILABLE_CELL("_N/A")
      if (translation === NOT_AVAILABLE_CELL) {
        return;
      }

      if (!flatLngsMap[lng]) {
        flatLngsMap[lng] = {};
      }

      flatLngsMap[lng][key] = translation || ''; // prevent to remove undefined value like ({"key": undefined})
    });
  });

  // 각 언어별로 평면화된 객체를 중첩 객체로 변환
  for (const [lng, flatObj] of Object.entries(flatLngsMap)) {
    const nestedObj = unflattenObject(flatObj);

    lngsMap[lng] = nestedObj;
  }

  return lngsMap;
}

async function updateJsonFromSheet() {
  const fs = await import('fs');

  const doc = await loadSpreadsheet();
  const lngsMap = await fetchTranslationsFromSheetToJson(doc);
  fs.readdir(localesPath, (error, lngs) => {
    if (error) {
      console.log('readdir error', error);
      throw error;
    }

    lngs.forEach((lng) => {
      const localeJsonFilePath = `${localesPath}/${lng}`;

      lng = lng.replace('.json', '');
      const jsonString = JSON.stringify(lngsMap[lng], null, 2);
      fs.writeFile(localeJsonFilePath, jsonString, 'utf8', (err) => {
        if (err) {
          throw err;
        }
      });
    });
  });
}

updateJsonFromSheet();
