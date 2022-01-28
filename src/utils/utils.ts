import { RegExpNumbers } from '../consts/reg-exp';
import { GuitarDataType } from '../types/guitar';

const validate = (number: string): string => {
  if (RegExpNumbers.test(number)) {
    return '';
  }
  return 'Please, enter a positive number';
};

const getTypesOverlap = (
  stringsState: string[],
  currentType: string,
  guitarsData: GuitarDataType[],
  stringsData: string[],
): boolean => {
  if (!stringsState.length || stringsState.length === stringsData.length) {
    return true;
  }

  const isStringOverlapTypes = stringsState.map((string) => {
    const currentGuitar = guitarsData.find((guitar) => guitar.type === currentType);
    return currentGuitar?.stringsCount.includes(string);
  });
  return isStringOverlapTypes.some((element) => element);
};

const getStringsOverlap = (typeState: string[], stringsCount: string, guitarsData: GuitarDataType[]): boolean => {
  if (!typeState.length || typeState.length === guitarsData.length) {
    return true;
  }

  const isTypeOverlapStrings = typeState.map((type) => {
    const currentGuitar = guitarsData.find((guitar) => guitar.type === type);
    return currentGuitar?.stringsCount.includes(stringsCount);
  });

  return isTypeOverlapStrings.some((element) => element);
};

export { validate, getTypesOverlap, getStringsOverlap };
