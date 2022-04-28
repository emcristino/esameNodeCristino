const express = require("express");
const router = express.Router();
const axios = require("axios");

async function loadUsers() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function loadUserById(id) {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const users = await loadUsers();
  res.render("userLayout", { title: "Users", users, dynamicPartial: () => "users" });
});

// FIX
// router.get("/post", async function (req, res, next) {
//   console.log("OIOIO");
//   res.send({ resp: "hello" });
// });
router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  const userData = await loadUserById(id);
  console.log(userData);
  res.render("userLayout", { title: "Users", user: userData, dynamicPartial: () => "user" });
});
module.exports = router;
