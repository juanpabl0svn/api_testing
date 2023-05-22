import { Router } from "express";
import db from "./json/db.js";

const router = Router();

router.post("/create/:data", (req, res) => {
  try {
    const { name, surname, role } = JSON.parse(req.params.data)
    const id = 1 + db[db.length - 1].id;
    const new_obj = {
      id,
      name,
      surname,
      role,
    };
    db.push(new_obj);
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ message: `Something went wrong: ${err.message}` });
  }
});

export default router;
