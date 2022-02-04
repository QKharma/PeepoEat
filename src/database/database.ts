import { Connection, createConnection } from 'typeorm';
import { TypeORMError } from 'typeorm';
import { Result } from '../util/Result';
import { Recipe } from './entities/Recipe';
import { Tag } from './entities/Tag';

export class DatabaseHandler {
  public static getDbConnection = async (): Promise<Result<Connection>> => {
    try {
      const connection = await createConnection({
        type: 'react-native',
        database: 'test',
        location: 'default',
        logging: ['error', 'query', 'schema'],
        synchronize: true,
        entities: [Recipe, Tag],
      });
  
      return connection;
    } catch (e) {
      if (e instanceof TypeORMError)
        return e;
      else
        return new Error('database connection failed')
    }
  };
}
