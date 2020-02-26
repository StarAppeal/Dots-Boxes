var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');

const sequelize = new Sequelize('admin_test', 'test', 'Gknw76*9', {
  host: 'localhost',
  port: 3306,
  dialect:'mariadb',
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  },
  define: {
    underscored: false,
    freezeTableName: false,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    },
    timestamps: true
  }
});


/* GET users listing. */
router.get('/',  function(req, res, next) {
	sequelize
  .authenticate()
  .then(() => {
    res.send('Connection has been established successfully.');
  })
  .catch(err => {
    res.send('Unable to connect to the database:', err);
  });
});

module.exports = router;