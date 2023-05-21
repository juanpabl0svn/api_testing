import { Router } from "express";
import db from "./json/db.js";

const router = Router();

router.get("/", (req, res) => {
  res.send(`<h1>Database test</h1><br/>Hello everyone, welcome to my API, here you will be able to do two thigs, if you want to consult a database with usernames and passwords, put in the pathname /db/ and next ot it you will be able to contult the data in /data, to consult an`,
  );
});

router.get("/data", (req, res) => {
  res.json({ message: db });
});

router.get("/auth/:data", (req, res) => {
  const { username, password } = JSON.parse(req.params.data);
  let user;
  db.forEach((el) => {
    if (el.username === username && el.password === password) {
      user = el;
    }
  });
  user
    ? res.status(202).json({ message: "User authenticated" })
    : res.status(402).json({ message: "Wrong username or password" });
});

router.get("/role/:role", (req, res) => {
  const role_filter = req.params.role;
  console.log(role_filter);
  const data = db.filter(({ role }) => role === role_filter);

  data.length !== 0
    ? res.status(200).json({ message: data })
    : res.status(400).json({ message: "No data found" });
});

export default router;
