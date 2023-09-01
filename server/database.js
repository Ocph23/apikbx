const crypto = require('crypto')
let mysql = require('mysql2');
let helper = require('./helper') 

let connection = mysql.createConnection({
  host:        'localhost',
  user:        process.env.user,
  password:    process.env.password,
  database:    process.env.database
});

connection.connect(function(error){
   if(error){
     helper.logger.log("error",error.code + error.message)
   }else{
    helper.logger.log("info","success")
   }
 });

 connection.generateAdmin = () => {
  const password = crypto.createHash('md5').update("Password@123").digest("hex")
  connection.query(
      "SELECT * FROM user limit 1",
      function (err, rows) {
          if (!err && rows.length <= 0) {
              var model = {
                  name: "administrator",
                  username: "admin@gmail.com",
                  passwordhash: password,
                  email: "admin@gmail.com",
                  role: "admin",
                  active: 1
              }

              connection.query(
                  "insert into user set ?", model,
                  function (err, rows) {
                      if (!err) {
                          console.log("success");
                      } else {
                          console.log(err);
                      }
                  }
              );
          } else {
              console.log(err)
          }
      }
  );


}




module.exports = connection; 