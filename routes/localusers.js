const express = require("express");
const router = express.Router();
const fs = require("fs");

let users = null



/* GET users listing. */
router.get("/", async function (req, res, next) {
  fs.readFile(__dirname +'/user.json', (err, data) => {
    if (err) throw err;
    users = JSON.parse(data);
    console.log(users);
}); 
  res.render("localuserLayout", { title: "Users", users, dynamicPartial: () => "localusers" });
});

module.exports = router;
