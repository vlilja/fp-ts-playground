import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { getSemigroup } from 'fp-ts/lib/ReadonlyNonEmptyArray';
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';

type Password = string;
type ValidationError = string;
type ValidatorFunction = (password: string) => boolean;

const isLongerThan = (requiredLength: number) => (password: string) => {
  return password.length >= requiredLength;
};

const containsUpperCaseCharacter = (password: string) => {
  return /[A-Z]/.test(password);
};

const containsNumber = (password: string) => {
  return /[0-9]/.test(password);
};

const validateWithErrorMessage =
  (validator: ValidatorFunction, errorMessage: ValidationError) =>
  (password: Password): E.Either<NonEmptyArray<ValidationError>, Password> =>
    validator(password)
      ? E.right(password as Password)
      : E.left([errorMessage]);

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

const validationResults = (password: string) =>
  pipe(
    validators,
    pipe(password, A.of, A.ap),
    A.sequence(E.getApplicativeValidation(getSemigroup<string>())),
    E.map(val => val[0])
  );

const success = validationResults('jerereje5je!!SfE');
const failure = validationResults('bad');
