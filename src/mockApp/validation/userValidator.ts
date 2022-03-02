import { sequenceS } from 'fp-ts/lib/Apply';
import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/Either';
import { getSemigroup } from 'fp-ts/lib/ReadonlyNonEmptyArray';
import { validateEmail } from './emailValidator';
import { validatePassword } from './passwordValidator';

import type { TUser as User } from '../types';

export const validateUser = (user: User) =>
  pipe(user, ({ email, password }) =>
    sequenceS(E.getApplicativeValidation(getSemigroup<string>()))({
      email: validateEmail(email),
      password: validatePassword(password),
    })
  );

//console.log(validateUser({ password: 'eräFer!!"€44', email: 'fffe@moi.fi' }));
