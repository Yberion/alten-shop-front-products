import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  /*
   * Resolve and load @commitlint/config-angular from node_modules.
   * Referenced packages must be installed
   */
  extends: ['@commitlint/config-angular'],
  rules: {
    'header-max-length': [0, 'always', 72],
    'scope-case': [2, 'always', ['lower-case', 'upper-case']],
    'subject-case': [0, 'always', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
  },
};

module.exports = Configuration;
