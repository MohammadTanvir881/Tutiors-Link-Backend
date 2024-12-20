
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  bcrypt_salt_round : process.env.BRCYPT_SALT_ROUNDS,
  Access_Token_Secret : process.env.JWT_ACCESS_TOKEN_SECRET,
  Refresh_Token_Secret : process.env.JWT_REFRESH_TOKEN_SECRET,
  Access_Token_ExpireIn : process.env.JWT_ACCESS_TOKEN_EXPIREIN,
  Refresh_Token_ExpireIn : process.env.JWT_REFRESH_TOKEN_EXPIREIN

};
