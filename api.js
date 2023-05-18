import express from "express";
import cors from "cors";
import morgan from "morgan";

import {} from "dotenv/config.js";
import bodyParser from "body-parser";

import get_router from "./routes/get_requests.js";
import post_router from "./routes/post_requests.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

app.use(get_router);
app.use(post_router);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
