import { registerAs } from '@nestjs/config';

export const MySQLConfig = registerAs('mysql', () => {
  const {
    ENV,
    DB_TYPE,
    DB_PORT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
  } = process.env;
  
  return {
    type: 'mysql',
    host: DB_HOST,
    port: DB_PORT ? parseInt(DB_PORT, 10) : 3306,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    autoLoadEntities: true,
    synchronize: ENV === 'DEV',
    logging: ENV === 'DEV',
    timezone: 'Z',
  };
});
