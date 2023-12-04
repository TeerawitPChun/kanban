import "dotenv/config";

const config = {
  host: process.env.HOST || "localhost",
  port: process.env.PORT || 3000,
  db: process.env.DB_FILENAME || "db.json",
};

export default config;
