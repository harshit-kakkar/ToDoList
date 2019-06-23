const Sequelize = require('sequelize')

const db = new Sequelize({
  dialect: 'sqlite',
  // when using sqlite
  storage: __dirname + '/todotasks.db',

  // for mysql/postgres/mssql
  host: '',
  username: '',
  password: '',
  database: ''
})

const Tasks = db.define('taskwithdesc', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
   description: {
     type: Sequelize.TEXT,
  }
//   done: {
//     type: Sequelize.BOOLEAN,
//     allowNull: false,
//     defaultValue: false
//   }
})

module.exports = {
  db, Tasks
}