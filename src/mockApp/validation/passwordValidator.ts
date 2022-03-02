import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { getSemigroup } from 'fp-ts/lib/ReadonlyNonEmptyArray';
import { validateWithErrorMessage } from './utils';

const isLongerThan = (requiredLength: number) => (password: string) => {
  return password.length >= requiredLength;
};

const containsUpperCaseCharacter = (password: string) => {
  return /[A-Z]/.test(password);
};

const containsNumber = (password: string) => {
  return /[0-9]/.test(password);
};

const isLongerThanWithErrorMessage = validateWithErrorMessage(
  isLongerThan(6),
  'Password needs to be longer than six characters'
);

const containsUpperCaseCharacterWithErrorMessage = validateWithErrorMessage(
  containsUpperCaseCharacter,
  'Password needs to have at least one upper case character'
);

const containsNumberWithErrorMessage = validateWithErrorMessage(
  containsNumber,
  'Password needs to have at least one number'
);

const validators = [
  isLongerThanWithErrorMessage,
  containsUpperCaseCharacterWithErrorMessage,
  containsNumberWithErrorMessage,
];

export const validatePassword = (password: string) =>
  pipe(
    validators,
    pipe(password, A.of, A.ap),
    A.sequence(E.getApplicativeValidation(getSemigroup<string>())),
    E.map((val) => val[0])
  );

const trace = <A>(a: A) => {
  console.log(new Date(), a);
  return a;
};
