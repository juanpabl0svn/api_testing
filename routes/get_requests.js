import { Router } from "express";
import db from "./json/db.js";

const router = Router();

router.get("/", (req, res) => {
  res.send(`<h1>Database test</h1><br/>Hello everyone,here if you want to see the register put in the path <a href="/db/data">/data</a>, if you want to filter the users by rol put <a href="/db/role/Student">/role/ROLEYOUWANT</a>, also you can authenticate here <a href='/db/auth/{"username":"juan123","password":"juanelmejor"}'>/auth/{"username":"YOURUSER","password":"YOURPASSWORD"</a> in JSON format, and finally if you want using the post request you can create your user here/create/"name":"YOURNAME","surname":"YOURSURNAME","role":"YOURROLE"`
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
