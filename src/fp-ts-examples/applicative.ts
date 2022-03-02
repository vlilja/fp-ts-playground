import { pipe, flow } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import * as A from 'fp-ts/Array';

const add = (x: number) => (y: number) => x + y;

const addO = O.of(add);

const maybeOne = O.some(1);
const maybeTwo = O.some(2);

const three = pipe(addO, O.ap(maybeOne), O.ap(maybeTwo));
const alsoThree = pipe(
  maybeOne,
  O.map(add),
  //O.map((addFn) => addFn(2))
  O.ap(maybeTwo)
);

console.log(three);
console.log(alsoThree);

const arr = [O.some(1), O.some(2)];

console.log(A.sequence(O.Applicative)(arr));