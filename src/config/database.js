import dotenv from 'dotenv';
dotenv.config();

const databaseConfig = {
  dialect: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'be_vascomm',
  logging: false,
};

export default databaseConfig;
