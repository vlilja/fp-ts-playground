import { pipe, flow } from 'fp-ts/function';
import { validateUser } from './validation/userValidator';
import { insertUser } from './db/insertUser';
import { sendVerifyEmail } from './verifyEmail';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { User } from './types';

const mockEndpoint = (body: any) => {
  return pipe(
    body,
    User.decode,
    E.chainW(validateUser),
    TE.fromEither,
    TE.chainW(insertUser),
    TE.chainFirstW(({ email }) =>
      TE.tryCatch(
        () => sendVerifyEmail(email),
        () => 'error'
      )
    )
  );
};

async function callAsync() {
  const res = await mockEndpoint({
    email: 'valtteri@supermetrics.com',
    password: 'sobad',
    age: 2,
  })();

  console.log('result is', res);
  console.log(E.getOrElseW(() => console.log('foo'))(res));
}

const trace = <A>(a: A) => {
  console.log(new Date(), a);
  return a;
};

callAsync();
