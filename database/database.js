const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error('Gabim në lidhje me databazë:', err);
    return;
  }
  console.log('Lidhja me databazë u bë me sukses ✅');
});

module.exports = connection;