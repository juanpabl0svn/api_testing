import { Router } from "express";
import db from "./db.js";

const router = Router();

router.post("/", (req, res) => {
  try {
    const { name, surname, role } = req.body;
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
