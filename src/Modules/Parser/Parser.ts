import fetch from 'node-fetch';
import xpath, { SelectedValue } from 'xpath';
import { DOMParser } from 'xmldom';

import * as T from './Parser.types';
import { PARSE_URL, XPATH_EXPS, FILTER_REX_EXP, NOT_FOUND_EXP } from '@constants';

export const filterByTags = (line: string): string =>
line && line.replace(FILTER_REX_EXP, '');

export const parse = ({
  word
}: T.IParseProps): Promise<T.IParseData> =>
  fetch(`${PARSE_URL}/${word}`)
    .then(res => res.text())
    .then((body: string) => {
      if (NOT_FOUND_EXP.test(body)) {
        return Promise.reject('not found');
      }

      return body;
    })
    .then((body: string): T.IParseData => {
      const DOM = new DOMParser().parseFromString(body);

      const transcriptionNodes: SelectedValue[] = xpath.select(XPATH_EXPS.TRANSCRIPTION, DOM);
      const transcription: string = filterByTags(transcriptionNodes[0]?.toString());

      const wordTypeNodes: SelectedValue[] = xpath.select(XPATH_EXPS.WORD_TYPE, DOM);
      const wordType: string = filterByTags(wordTypeNodes[0]?.toString());

      const meaningsNodes: SelectedValue[] = xpath.select(XPATH_EXPS.MEANINGS, DOM);
      const meanings: string[] = meaningsNodes.map(
        (item: SelectedValue): string => filterByTags(item?.toString())
      );

      const translationsNodes: SelectedValue[] = xpath.select(XPATH_EXPS.TRANSLATIONS, DOM);
      const translations: string[] = translationsNodes.map(
        (item: SelectedValue): string => filterByTags(item?.toString())
      );

      const examplesNodes: SelectedValue[] = xpath.select(XPATH_EXPS.EXAMPLES, DOM);
      const examples: string[] = examplesNodes.map(
        (item: SelectedValue): string => filterByTags(item?.toString())
      );

      return {
        transcription,
        wordType,
        meanings,
        translations,
        examples
      };
    })
