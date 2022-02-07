import { Connection, createConnection } from 'typeorm';
import { TypeORMError } from 'typeorm';
import { isError, Result } from '../util/Result';
import { Recipe } from './entities/Recipe';
import { Tag } from './entities/Tag';

export class DatabaseHandler {

  connection: Connection|undefined;

  constructor() {
    this.setConnection();
  }
  
  async setConnection() {
    this.connection = await this.unwrapConnection();
  }
  
  async unwrapConnection(): Promise<Connection|undefined> {
    const connection = await this.getDbConnection();
    if (isError(connection)) {
      console.log(connection.message);
      return undefined;
    } else {
      return connection;
    }
  }

  async getDbConnection(): Promise<Result<Connection>> {
    try {
      const connection = await createConnection({
        type: 'expo',
        database: 'peepo.db',
        driver: require('expo-sqlite'),
        logging: ['error'],
        synchronize: true,
        entities: [Recipe, Tag],
      });
  
      return connection;
    } catch (e) {
      if (e instanceof TypeORMError)
        return e;
      else
        return new Error(`database connection failed ${e}`)
    }
  };
}

export const databaseHandler = new DatabaseHandler();