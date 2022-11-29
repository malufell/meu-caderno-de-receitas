require("dotenv").config();

module.exports = {
  development: {
    username: "postgres",
    password: "admin",
    database: "receitas",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_NAME,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
  },
};
