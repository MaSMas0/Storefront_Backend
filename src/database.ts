import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  ENV,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  TOKEN_SECRET,
  BEARER_TOKEN_TEST
} = process.env;

const client = new Pool({
  host: POSTGRES_HOST,
  database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: parseInt(POSTGRES_PORT as string, 10)
});
export {
  client,
  BCRYPT_PASSWORD as pepper,
  SALT_ROUNDS,
  TOKEN_SECRET,
  BEARER_TOKEN_TEST as test_token
};
