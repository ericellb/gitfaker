import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import inquirer from 'inquirer';
import simplegit from 'simple-git/promise';

export const gitCommitAndPush = async (commitDates: string[]): Promise<void> => {
  const { user } = await inquirer.prompt({ name: 'user', message: 'Github Username : ' });
  const { email } = await inquirer.prompt({ name: 'user', message: 'Github Email : ' });
  const { pass } = await inquirer.prompt({ name: 'pass', message: 'Github Password : ', type: 'password' });
  const repoName = 'gitfaker';
  const repo = `github.com/${user}/${repoName}`;
  const remote = `https://${user}:${pass}@${repo}`;
  const workingDir = path.join(__dirname, repoName);
  const commitMessage = `Fake Commit\n\nTool Written by : https://github.com/ericellb`;

  // If previous folder exist, delete it
  if (fs.existsSync(workingDir)) {
    rimraf.sync(workingDir);
  }
  fs.mkdirSync(workingDir);

  // Create client with working dir
  const gitClient = simplegit(workingDir);
  gitClient.init(false);
  gitClient.addConfig('user.name', user);
  gitClient.addConfig('user.email', email);

  //For each commit date, create a fake commit
  commitDates.forEach(commitDate => {
    gitClient.commit(commitMessage, [], { '--allow-empty': null, '--date': commitDate });
  });

  // Push the changes!
  await gitClient.silent(true).push(remote, 'master', { '-f': null });
};
