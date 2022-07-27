const db = require("../db.js");
const crypto = require("crypto");

// const maindb = require("../config/maindb.js");
const md5 = require('md5');
const conferenceappModel = function(book) {
    this.emp_code = book.emp_code;
    this.emp_password = book.emp_password;
   
};

const secret = "goodwill";
const rounds = 9921;
const keySize = 32;
const algorithm = "aes-256-cbc";
const salt = crypto.createHash("sha1").update(secret).digest("hex");
let ivr = crypto.randomBytes(16);
function encrypt(data) {
  try {
    let iv = crypto.randomBytes(16);
    let key = crypto.pbkdf2Sync(secret, salt, rounds, keySize, "sha512");
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encryptedData = Buffer.concat([
      cipher.update(JSON.stringify(data)),
      cipher.final(),
    ]);
    console.log(encryptedData.toString("base64"));
    return encryptedData.toString("base64");
  } catch (err) {
    console.error(err);
    return false;
  }
}
function decrypt(encData) {
  try {
    let textParts = encData.split(":");
    let iv = Buffer.from(textParts.shift(), "base64");
    let encryptedData = Buffer.from(textParts.join(":"), "base64");
    let key = crypto.pbkdf2Sync(secret, salt, rounds, keySize, "sha512");
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decryptedData = decipher.update(encryptedData);
    decryptedData = Buffer.concat([decryptedData, decipher.final()]);
    console.log("dec", decryptedData.toString());
    return JSON.parse(decryptedData.toString());
  } catch (err) {
    console.error(err);
    return false;
  }
}


conferenceappModel.bookpage = (bookingdata, result)=>{
    var sqlQuery = `SELECT * FROM hrm_users where emp_code='${bookingdata.emp_code}'`;
    console.log(sqlQuery);
    db.query(sqlQuery, (error, response)=>{
       
        if(error){
            var userres = {
                sts:"0",
                message: error
            }
            result(userres,null);
        }else if(response.length>0){
            console.log(response);
            var content = response[0]['emp_password'];
            console.log("content")
            console.log(content)
            var decrypted_sql_password = decrypt(content);
            console.log("decrypted_sql_password");
            console.log(decrypted_sql_password);
            var encrypted_login_password = encrypt(bookingdata.emp_password);
            console.log("encrypted_login_password");
            console.log(encrypted_login_password);
            var decrypted_login_password = decrypt(encrypted_login_password);
            console.log("decrypted_login_password");
            console.log(decrypted_login_password);
            if (response.length &&
                decrypted_sql_password !== decrypted_login_password) {
                var userres = {
                    sts:"0",
                    message: "incorrect password",
                }
                result(null, userres);
              } else if (response.length &&
                decrypted_sql_password == decrypted_login_password) {
            var userres = {
                sts:"1",
                message: "Login Success",
                data:response
            }
            result(null,userres);
        }
        }else{
            var userres = {
                sts:"0",
                message: "No user Found",
            }
            result(null,userres); 
        }
    })
}




module.exports = conferenceappModel;