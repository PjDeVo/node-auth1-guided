const router = require("express").Router();
const Users = require("../users/users-model.js");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  try {
    const saved = await Users.add(user);
    res.status(200).json(saved);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "There was an error retreiving data from the database",
    });
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  try {
    const user = await Users.findBy({ username }).first();
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.status(200).json({ message: `welcome ${username}` });
    } else {
      res.status(401).json({ errorMessage: "invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Error Accessing the DB" });
  }
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.send("Sorry, you are stuck here");
      } else {
        res.send("So long, farewell, I mean to say goodbye");
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
