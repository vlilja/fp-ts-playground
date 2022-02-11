import { flow, pipe } from 'fp-ts/function';

const add = (i: number) => (k: number) => i + k;

const addOne = add(1);

const addTwo = add(2);

const three = pipe(2, addOne);

const uppercase = (str: string) => str.toUpperCase();

const concatenate = (nextWord: string) => (word: string) =>
  word.concat(nextWord);

const numberToString = (num: number) => num.toString();

const addThreeAndFour = flow(add(4), add(3));

console.log(`Should be three`, three);

console.log(`Adding 3 + 4 + 1 should be 8`, addThreeAndFour(1));

console.log('=================');

console.log(pipe('fp-ts is', concatenate(' fun'), uppercase));

const haveBeenLearningFpTsFor = flow(addOne, numberToString, (years) =>
  pipe('I have been learning fp-ts for ', concatenate(years), concatenate(' years'))
);

console.log(haveBeenLearningFpTsFor(3));

console.log('Yell it out!!!', pipe(haveBeenLearningFpTsFor(3), uppercase, concatenate('!!!!')))