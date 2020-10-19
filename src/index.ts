import parse from '@modules/Parser';
import { IParseData } from '@modules/Parser/Parser.types';
import { openFile, readFile, writeFile } from '@modules/XLSXModule';
import { IFileData, IXLSXFile } from '@modules/XLSXModule/XLSXModule.types';
import { ICellValue, IDictionary } from '@types';

const XLSXFile: Promise<IXLSXFile> = openFile();
const Dictionary: IDictionary = {};

XLSXFile
  .then(() => readFile(XLSXFile))
  .then((data: IFileData) => {
    if (!Array.isArray(data)) {
      throw new Error('no words');
    }

    const promises: Promise<any>[] =
      // @ts-ignore
      data.map((item: ICellValue | ICellValue[]): Promise<any> => {
        let word: ICellValue;
        if (Array.isArray(item)) {
          word = item[0];
        } else {
          word = item;
        }

        return parse({ word: word as string })
          .then((parsedData: IParseData) => (Dictionary[word] = parsedData))
          .catch(console.log);
      });

    return Promise.all(promises);
  })
  .then(() => {
    const outputData: IFileData = Object.entries(Dictionary)
      .map(([word, data]: [string, IParseData]) => {
        const returnedData: string[] = [word];

        const {
          transcription,
          wordType,
          meanings,
          translations,
          examples
        } = data;

        returnedData.push(wordType);
        returnedData.push(transcription);
        returnedData.push(translations.join(' \r\n '));
        returnedData.push(meanings.join(' \r\n '));
        returnedData.push(examples.join(' \r\n '));

        return returnedData;
      });

    writeFile(XLSXFile, outputData);
  })
  .catch(console.log);