const express = require("express");
const cors = require("cors");
const axios = require("axios");
const productApi = require("./api/product.cjs");
const messageApi = require("./api/message.cjs");
// install ejs

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productApi);
app.use("/api/messages", messageApi);

// add supabase for database

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
