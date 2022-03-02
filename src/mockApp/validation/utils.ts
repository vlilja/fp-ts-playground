import { Either, right, left } from 'fp-ts/Either';
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';
import { ValidatorFunction, ValidationError, TPassword as Password } from '../types';

export const validateWithErrorMessage =
  (validator: ValidatorFunction, errorMessage: ValidationError) =>
  (password: Password): Either<NonEmptyArray<ValidationError>, Password> =>
    validator(password) ? right(password as Password) : left([errorMessage]);
