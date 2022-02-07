import { Connection, createConnection } from 'typeorm';
import { TypeORMError } from 'typeorm';
import { isError, Result } from '../util/Result';
import { Recipe } from './entities/Recipe';
import { Tag } from './entities/Tag';

export class DatabaseHandler {

  connection: Connection;

  constructor() {
    this.setConnection();
  }
  
  async setConnection() {
    this.connection = await this.getDbConnection();
  }

  async getDbConnection(): Promise<Connection> {
    const connection = await createConnection({
      type: 'expo',
      database: 'peepo.db',
      driver: require('expo-sqlite'),
      logging: ['error'],
      synchronize: true,
      entities: [Recipe, Tag],
    });

    return connection;
  };
}

export const databaseHandler = new DatabaseHandler();