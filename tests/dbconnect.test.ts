import 'reflect-metadata';
import { DatabaseHandler } from '../src/database/database';
import { isError } from '../src/util/Result';

const connection = DatabaseHandler.getDbConnection();

test('returns connection', () => {
  expect(isError(connection)).toBe(false);
})