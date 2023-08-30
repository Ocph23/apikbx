let mysql = require('mysql2');
 
let connection = mysql.createConnection({
   host:        'localhost',
   user:        'root',
   password:    'Sonyalpha@77',
   database:    'keybexpressdb'
 });

connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Koneksi Berhasil!');
   }
 })

module.exports = connection; 