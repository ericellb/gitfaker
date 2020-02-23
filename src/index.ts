import _ from 'lodash';
import inquirer from 'inquirer';
import { gitCommitAndPush } from './git';
import { alphabet } from './alphabet';
import { formatWord, getWordWidth } from './helpers';

(async () => {
  const gitCommitHistory: number[][] = [[], [], [], [], [], [], []];

  const { confirmation } = await inquirer.prompt({
    name: 'confirmation',
    message: `In order for this tool to work you must provide your Github Username, Email and Password. None of this information is stored. It's only used to create the commits. You must have a repository named 'gitfaker' 
    \n You must have a Git Repository created with the name 'gitfaker'
    \n Please confirm that you have read above, and have the Git Repository created [y/n]`,
  });

  if ((confirmation as string).toLocaleLowerCase().charAt(0) !== 'y') {
    console.log(`You must have a git repo named 'gitfaker' in order to use this tool`);
    process.exit(0);
  } else {
    console.log('\n');
  }

  const answer = await inquirer.prompt({ name: 'message', message: 'Create your message! (max typically 8-11 chars)' });
  const message = formatWord(answer.message);
  const wordRowLength = getWordWidth(message);

  if (wordRowLength > 52) {
    console.log('Please try a new word, exceed maximum of 52');
    process.exit(0);
  }

  // Offset our word, so its centered in 52 width array
  const offset = Math.floor((53 - wordRowLength) / 2);
  Array.from(Array(offset)).forEach(() => {
    alphabet['-'].forEach((column, i) => {
      column.forEach(entry => {
        gitCommitHistory[i + 1].push(entry);
      });
    });
  });

  // Populate our 52 column 7 row array of git commit history with our word
  [...message].forEach(character => {
    alphabet[character].forEach((row, i) => {
      row.forEach(entry => {
        gitCommitHistory[i + 1].push(entry);
      });
    });
  });

  // Find the dates for the commits we plan to make from gitCommitHistory array
  const yearAgo = 370;
  let daysPassed = 0;
  const commitDates: string[] = [];
  const transposedGitCommitHistory = _.zip(...gitCommitHistory);
  transposedGitCommitHistory.forEach(week => {
    week.forEach(entry => {
      if (entry) {
        commitDates.push(`${yearAgo - daysPassed} days ago`);
      }
      daysPassed += 1;
    });
  });

  try {
    await gitCommitAndPush(commitDates);
    console.log('Successfully created the message, check out your contribution history!');
  } catch (err) {
    console.log('Authentication Failed to Github. Invalid Username / Password');
  }
})();
