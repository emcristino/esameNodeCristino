const express = require("express");
const router = express.Router();

//utilizzo Filesystem
const fs = require("fs");

let users = null

/* GET users listing. */
router.get("/", async function (req, res, next) {
  fs.readFile(__dirname +'/user.json', (err, data) => { //leggo  contenuto del file indicato
    if (err) throw err; // controllo se ci sono errori
    users = JSON.parse(data); // parsifico da JSON a oggetto
    console.log(users);
}); 
  res.render("localuserLayout", { title: "Users", users, dynamicPartial: () => "localusers" });
});

module.exports = router;