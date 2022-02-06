import { Connection, createConnection } from 'typeorm';
import { TypeORMError } from 'typeorm';
import { Result } from '../util/Result';
import { Recipe } from './entities/Recipe';
import { Tag } from './entities/Tag';

export class DatabaseHandler {
  public static getDbConnection = async (): Promise<Result<Connection>> => {
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
