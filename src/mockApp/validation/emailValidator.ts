import { validateWithErrorMessage } from './utils';

const emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validateEmailAddress = (email: string) => emailRegex.test(email);

const validateEmailWithErrorMessage = validateWithErrorMessage(
  validateEmailAddress,
  'Invalid email given'
);

export const validateEmail = validateEmailWithErrorMessage;
