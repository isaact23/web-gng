import { pathsToModuleNameMapper } from 'ts-jest'
import tsconfig from './tsconfig.json' with {type: 'json'}

const compilerOptions = tsconfig.compilerOptions;

// From https://www.testim.io/blog/typescript-unit-testing-101/

const CONFIG = {
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testEnvironment: 'node',
  testRegex: '.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' })
};
export default CONFIG;
