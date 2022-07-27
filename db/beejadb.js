var mysql = require('mysql');

var Conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rootpass',
        database: 'beeja_db'
        })
      Conn.connect(err => {
        if (err) {
          console.error('connection error', err.stack)
        } else {
          console.log('connected Beeja DB')
        }
      });

module.exports = Conn;