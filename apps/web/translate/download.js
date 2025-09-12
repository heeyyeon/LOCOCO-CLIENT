/**
 * @fileoverview Google Sheets에서 번역 데이터를 다운로드하고 JSON 파일로 변환하는 모듈
 * @author LOKOKO Team JaeHoon
 */

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

/**
 * 언어 코드를 Google Sheets의 _rawData 인덱스로 매핑하는 객체
 * @description _rawData 배열 구조: [key값, 한글, 영어, 스페인어]
 * @type {Object.<string, number>}
 */
const langToNumber = lngs.reduce((acc, lng, index) => {
  acc[lng] = index + 1; // _rawData[0]은 key이므로 1부터 시작
  return acc;
}, {});

/**
 * 언어 코드에 해당하는 _rawData 인덱스를 반환
 * @param {string} lang - 언어 코드 (ko, en, es)
 * @returns {number} 해당 언어의 _rawData 인덱스
 * @throws {Error} 지원하지 않는 언어 코드인 경우 에러 발생
 * @example
 * getNumberByLang('ko') // 1
 * getNumberByLang('en') // 2
 * getNumberByLang('unknown') // Error: Unsupported language code: unknown
 */
function getNumberByLang(lang) {
  if (!(lang in langToNumber)) {
    throw new Error(`Unsupported language code: ${lang}`);
  }
  return langToNumber[lang];
}

/**
 * 평면화된 키를 중첩 객체로 변환하는 함수
 * @description 점(.)으로 구분된 키를 중첩 객체 구조로 변환
 * @param {Object.<string, string>} flatObj - 평면화된 키-값 객체
 * @returns {Object} 중첩 구조로 변환된 객체
 */
function unflattenObject(flatObj) {
  const result = {};

  for (const [key, value] of Object.entries(flatObj)) {
    const keys = key.split('.');
    let current = result;

    // 마지막 키를 제외한 모든 키에 대해 중첩 객체 생성
    for (let i = 0; i < keys.length - 1; i++) {
      const currentKey = keys[i];

      if (current[currentKey] && typeof current[currentKey] !== 'object') {
        current[currentKey] = { _value: current[currentKey] };
      }

      if (!current[currentKey]) {
        current[currentKey] = {};
      }
      current = current[currentKey];
    }

    // 마지막 키에 값 할당
    const lastKey = keys[keys.length - 1];

    if (current[lastKey] && typeof current[lastKey] !== 'object') {
      current[lastKey] = { _value: current[lastKey] };
    }
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

/**
 * Google Sheets에서 번역 데이터를 가져와서 로컬 JSON 파일로 업데이트
 * @description Google Sheets의 번역 데이터를 다운로드하여 각 언어별 JSON 파일로 저장
 * @returns {Promise<void>}
 * @throws {Error} 파일 읽기/쓰기 오류 시 발생
 * @example
 * await updateJsonFromSheet();
 * // messages/ko.json, messages/en.json, messages/es.json 파일이 업데이트됨
 */
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
        console.log(`${lng} 파일 다운로드 완료 ✅`);
      });
    });
  });
}

updateJsonFromSheet();
