import { GuitarDataType } from '../types/guitar';

const guitarType = {
  Electric: 'electric',
  Acoustic: 'acoustic',
  Ukulele: 'ukulele',
};

const stringsCount = {
  Four: '4',
  Six: '6',
  Seven: '7',
  Twelve: '12',
};

const guitarsData: GuitarDataType[] = [
  {
    type: guitarType.Acoustic,
    label: 'Акустические гитары',
    stringsCount: [stringsCount.Six, stringsCount.Seven, stringsCount.Twelve],
  },
  {
    type: guitarType.Electric,
    label: 'Электрогитары',
    stringsCount: [stringsCount.Four, stringsCount.Six, stringsCount.Seven],
  },
  {
    type: guitarType.Ukulele,
    label: 'Укулеле',
    stringsCount: [stringsCount.Four],
  },
];

const GUITARS_COUNT_FROM_HEADERS = 'x-total-count';

export { guitarType, stringsCount, guitarsData, GUITARS_COUNT_FROM_HEADERS };
