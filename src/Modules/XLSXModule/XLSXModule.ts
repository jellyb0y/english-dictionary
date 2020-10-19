import xlsx from 'xlsx-populate';

import { XLSX_FILE_PATH, XLSX_SHEET } from '@constants';
import * as T from './XLSXModule.types';

export const openFile = (filePath = XLSX_FILE_PATH): Promise<T.IXLSXFile> =>
  xlsx.fromFileAsync(filePath)
    .catch(() => xlsx.fromBlankAsync())
    .then((xlsxFile: T.IWorkbook): T.IWorkbook => xlsxFile || xlsx.fromBlankAsync())
    .then((workbook: T.IWorkbook): T.IXLSXFile => ({ workbook, file: filePath }));

export const writeFile = (xlsxPromise: Promise<T.IXLSXFile>, data: T.IFileData, cell = 'A1'): Promise<any> =>
  xlsxPromise.then(({ workbook, file }: T.IXLSXFile) => {
    const sheet: T.ISheet = workbook.sheet(XLSX_SHEET);
    sheet.cell(cell).value(data);
    workbook.toFileAsync(file)
  });

export const readFile = (xlsxPromise: Promise<T.IXLSXFile>): Promise<T.IFileData> =>
  xlsxPromise.then(({ workbook }: T.IXLSXFile) => {
    const sheet: T.ISheet = workbook.sheet(XLSX_SHEET);
    return sheet.usedRange().value();
  });
