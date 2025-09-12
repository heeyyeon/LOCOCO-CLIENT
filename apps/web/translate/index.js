import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import credentials from './credentials.json' assert { type: 'json' };
// import dotenv from 'dotenv';  
// dotenv.config();

const ns = 'ko';
const lngs = ['ko', 'en', 'es'];
const localesPath = 'messages';
const sheetId = 0; // your sheet id
const NOT_AVAILABLE_CELL = '_N/A';
const columnKeyToHeader = {
  key: '키',
  'ko': '한글',
  'en': '영어',
  'es': '스페인어',
};
const googleSheetId = process.env.TRANSLATE_GOOGLE_SHEET_ID;

// Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
const email = credentials.client_email;
const key = credentials.private_key.replace(/\\n/g, '\n');

const serviceAccountAuth = new JWT({
  email,
  key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
/**
 * getting started from https://theoephraim.github.io/node-google-spreadsheet
 */
async function loadSpreadsheet() {

  // spreadsheet key is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(
    googleSheetId,
    serviceAccountAuth
  );
  // load directly from json file if not in secure environment

  await doc.loadInfo(); // loads document properties and worksheets

  return doc;
}

function getPureKey(key = '') {
  return key;
}

export {
  localesPath,
  loadSpreadsheet,
  getPureKey,
  ns,
  lngs,
  sheetId,
  columnKeyToHeader,
  NOT_AVAILABLE_CELL,
};
