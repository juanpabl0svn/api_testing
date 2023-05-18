import { Router } from "express";
import db from "./db.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: db });
});

router.get("/auth", (req, res) => {
  const { username, password } = req.body;
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

router.get("/role", (req, res) => {
  const role_filter = req.body.role;
  const data = db.filter(({ role }) => role === role_filter);
  data.length == !0
    ? res.status(200).json({ message: data })
    : res.status(400).json({ message: "No data found" });
});

export default router;
