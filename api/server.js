const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const sessionConfig = {
  name: "sksession",
  secret: "secret is speshul",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
};

const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/auth-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
