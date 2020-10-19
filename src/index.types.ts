import { IParseData } from '@modules/Parser/Parser.types';

export type ICellValue = number | string;

export interface IDictionary {
  [word: string]: IParseData
}
