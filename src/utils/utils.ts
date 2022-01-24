import { RegExpNumbers } from '../consts/reg-exp';

const validate = (number: string): string => {
  if (RegExpNumbers.test(number)) {
    return '';
  }
  return 'Please, enter a positive number';
};

export { validate };
