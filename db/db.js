var mysql = require('mysql');

var Conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rootpass',
        database: 'bookconference'
        })
      Conn.connect(err => {
        if (err) {
          console.error('connection error', err.stack)
        } else {
          console.log('connected Conference DB')
        }
      })


      
      
      
   

    

    

module.exports = Conn;