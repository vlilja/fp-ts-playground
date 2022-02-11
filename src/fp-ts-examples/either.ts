import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import { Console } from 'console';

const rollDice = (loaded: number = 0) =>
  Math.round(Math.random() * 5 + 1 + loaded);

const rollAtLeastThree = (loaded?: number) => {
  const roll = rollDice(loaded);
  return roll >= 3 ? E.right(roll > 6 ? 6 : roll) : E.left(roll < 1 ? 1 : roll);
};

console.log(rollAtLeastThree(6)); // Succeed always
console.log(rollAtLeastThree());
console.log(rollAtLeastThree());

const move = (moveBy: number) => { console.log('I moved by ' + moveBy); return moveBy};
const rolledOnly = (roll: number) =>
  console.log('Rolled ', roll);
const shootRockets = (roll: number) => {
  if(roll === 6) {
    console.log('Shooting rockets too!!!');
    return E.right(roll);
  }

  return E.left(roll);
}


const moveOnBoardLoaded = pipe(
  rollAtLeastThree(6),
  E.map(move),
  E.chainW(shootRockets),
  E.fold(rolledOnly, () => console.log('Done it all'))
);

const moveOnBoard = pipe(
  rollAtLeastThree(),
  E.map(move),
  E.chainW(shootRockets),
  E.mapLeft(rolledOnly),
  E.map(() => console.log('Done it all'))
);

const failingToMove = pipe(
  rollAtLeastThree(-6),
  E.map(move),
  E.chainW(shootRockets),
  E.mapLeft(rolledOnly)
);
