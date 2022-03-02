import { match } from 'fp-ts/lib/EitherT';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { TPassword as Password, TUser as User } from '../types';

const hashFn = (password: Password): string => {
  // Pretend we hash something
  return `SoHashed${password}`;
};

const hashPassword = (user: User) => {
  return { ...user, password: hashFn(user.password) as Password };
};

const insertUserToDb = (user: User): Promise<User> => {
  // Fake insert user to db
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(user);
      //reject();
    }, 750);
  });
};

const TEInsertUserToDb = (user: User) =>
  TE.tryCatch(
    () => insertUserToDb(user),
    () => 'Error inserting user to db'
  );

export const insertUser = (user: User) =>
  pipe(user, hashPassword, TEInsertUserToDb);
