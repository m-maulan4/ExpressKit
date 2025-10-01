require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./src/db/config/db.js");
const port = process.env.APP_PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
