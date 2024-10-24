const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

require("dotenv").config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoURI = process.env.LOCAL_DB_ADDRESS;
mongoose
  .connect(mongoURI, { useNewUriParse: true })
  .then(() => console.log("mongoose connecte"))
  .catch((error) => console.log("DB connection fail", error));

app.listen(process.env.PORT || 5000, () => {
  console.log("server on");
});
