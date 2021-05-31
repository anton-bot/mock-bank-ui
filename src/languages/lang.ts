import { Language } from '../types/Language';
import english from './data/en-HK.json';

const HARDCODED_LANGUAGE = Language.English;

export const languageFiles: Record<Language, typeof english> = {
  [Language.English]: english,
};

export const lang = () => languageFiles[HARDCODED_LANGUAGE];
