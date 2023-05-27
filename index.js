import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";

import {} from "dotenv/config.js";
import bodyParser from "body-parser";

import get_router from "./routes/api/db/get_requests.js";
import post_router from "./routes/api/db/post_requests.js";
import get_router_order from "./routes/api/order/get_requests.js";

import * as url from "url";
const __dirname = url.fileURLToPath(new URL("./routes/pages", import.meta.url));


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

export const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/landPage.html');
});

app.get('/db',(req,res)=>{
  res.sendFile(__dirname + '/dbPages/explain.html')
})

app.get("/db/data", (req, res) => {
  res.sendFile(__dirname + '/dbPages/showData.html');
});

app.get("/db/role", (req, res) => {
  res.sendFile(__dirname + '/dbPages/showRole.html');
});

app.get("/db/auth", (req, res) => {
  res.sendFile(__dirname + '/dbPages/logIn.html');
});

app.get("/db/create", (req, res) => {
  res.sendFile(__dirname + '/dbPages/newUser.html');
});



app.get('/order', (req, res) => {
  res.sendFile(__dirname + '/orderPages/explain.html');
})

app.get('/order/data', (req, res) => {
  res.sendFile(__dirname + '/orderPages/showData.html');
})

app.use("/api/db", get_router);
app.use("/api/db", post_router);
app.use("/api/order", get_router_order);

app.get("/*", (req, res) => {
  res.send('<h1>404 Not Found</h1> <br/> <a href=" / ">Go back</a>');
});
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

export default PORT;
