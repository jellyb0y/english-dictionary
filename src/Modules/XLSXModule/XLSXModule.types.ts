import { ICellValue } from "@types";

export interface IXLSXFile {
  workbook: IWorkbook;
  file: string;
}

export  interface IWorkbook {
  sheet: (sheetName: string) => ISheet;
  toFileAsync: (fileName: string) => Promise<any>;
}

export  interface ISheet {
  cell: (cellName: string) => ICell;
  range: (range: string) => ICell;
  usedRange: () => ICell;
}

export interface ICell {
  value: (value?: any) => IFileData;
}

export type IFileData =
  ICellValue |
  ICellValue[] |
  ICellValue[][]
