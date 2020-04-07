module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./db.development.sqlite",
    define: {
      freezeTableName: true,
      timestamps: false
    }
  },
  debug: {
    dialect: "sqlite",
    storage: ":memory:",
    define: {
      freezeTableName: true,
      timestamps: false
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mariadb',
    define: {
      freezeTableName: true,
      timestamps: false
    }
  }
};
