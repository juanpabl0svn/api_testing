import URL from "../../index.js";
import { Router } from "express";

const router = Router();

const getData = async () => {
  try {
    const request = await fetch(URL);
    const response = await request.json();
    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
};

router.get("/", async (req, res) => {
  const data = await getData();
  data
    ? res.status(200).json({ message: data })
    : res.status(404).json({ message: "Error" });
});

export default router;
