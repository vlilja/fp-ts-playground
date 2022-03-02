import * as t from 'io-ts';

//export type Password = string;
export type Email = string;
export type ValidationError = string;
export type ValidatorFunction = (...args: any) => boolean;

const Password = t.string;

export const User = t.intersection([
  t.type({
    email: t.string,
    password: t.string,
  }),
  t.partial({
    age: t.number,
  }),
]);

export type TUser = t.TypeOf<typeof User>;
export type TPassword = t.TypeOf<typeof Password>;
