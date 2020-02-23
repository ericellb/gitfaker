import { alphabet } from './alphabet';
import { SPACE } from './types';

const getLetterWidth = (letter: number[][]) => {
  return letter[0].length;
};

export const getWordWidth = (word: any) => {
  let wordRowLength = 0;
  for (const index in word) {
    let letter: string = word[index];
    // If space, set letter to string version of 32
    if (letter.charCodeAt(0) === SPACE) {
      letter = ' ';
    }
    wordRowLength += getLetterWidth(alphabet[letter]);
  }
  return wordRowLength;
};

export const formatWord = (message: string) => {
  // Finds words seperated by spaces
  const words = message.match(/([a-zA-z])+/g);
  let finalMessage = '';

  // Adds spacing character between letters
  words?.forEach((word, i) => {
    finalMessage += word.split('').join('-');
    if (i !== words.length - 1) {
      finalMessage += ' ';
    }
  });

  return finalMessage;
};
