import path from 'path';

/**
 * Ссылка на парсинг из словаря
 */
export const PARSE_URL = 'https://dictionary.cambridge.org/dictionary/english-russian/';

/**
 * Набор xpath выражений для вычленения нужных параметров
 */
export const XPATH_EXPS = {
  TRANSCRIPTION: '//*[@id="page-content"]/div[2]/div[2]/div[2]/span/span[1]/span[2]/span',
  WORD_TYPE: '//*[@id="page-content"]/div[2]/div[2]/div[2]/span/div[1]/span[1]',
  MEANINGS: '//*[@id="page-content"]/div[2]/div[2]/div[3]/div/div/div[3]/div[*]/div[2]/div/div[2]/div',
  TRANSLATIONS: '//*[@id="page-content"]/div[2]/div[2]/div[3]/div/div/div[3]/div[*]/div[2]/div/div[3]/span',
  EXAMPLES: '//*[@id="page-content"]/div[2]/div[2]/div[3]/div/div/div[3]/div[*]/div[2]/div/div[3]/div[*]/span'
}

/**
 * Выражение 404
 */
export const NOT_FOUND_EXP = /Your search terms did not match any entries./;

/**
 * Регулярка для фильтрации тегов и прочего мусора при парсинге
 */
export const FILTER_REX_EXP = /<[^<>]*>|<\/[^<>]*>|\n\s+/g;

/**
 * Файл куда будет записан словарь (по-дефолту)
 */
export const XLSX_FILE_PATH = path.resolve(__dirname, '../Dictionary.xlsx');

/**
 * Дефолтный лист
 */
export const XLSX_SHEET = 'Sheet1';
