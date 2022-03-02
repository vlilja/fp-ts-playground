import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';

const rollDice = (loaded: number = 0) =>
  Math.round(Math.random() * 5 + 1 + loaded);

const rollAtLeastThree = (loaded?: number) => {
  const roll = rollDice(loaded);
  return roll >= 3 ? E.right(roll > 6 ? 6 : roll) : E.left(roll < 1 ? 1 : roll);
};

const move = (moveBy: number) => {
  console.log('I moved by ' + moveBy);
  return moveBy;
};

const rolledOnly = (roll: number) => console.log('Rolled only', roll);
const turnSucceeded = (roll: number) => console.log('Successful turn');

const shootRockets = (roll: number) => {
  if (roll === 6) {
    console.log('I rolled six so I shoot rockets too!');
  }

  return roll;
};

console.log('=== I SUCCEED ALWAYS ===');
const moveOnBoardLoaded = pipe(
  rollAtLeastThree(6),
  E.map(move),
  E.map(shootRockets),
  E.fold(rolledOnly, turnSucceeded)
);

console.log('=== I MAY SUCCEED ===');
const moveOnBoard = pipe(
  rollAtLeastThree(),
  E.map(move),
  E.map(shootRockets),
  E.fold(rolledOnly, turnSucceeded)
);

console.log('==== I ALWAYS FAIL ====');
const failingToMove = pipe(
  rollAtLeastThree(-6),
  E.map(move),
  E.map(shootRockets),
  E.mapLeft(rolledOnly)
);
