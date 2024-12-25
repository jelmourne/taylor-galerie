const express = require("express");
const path = require("path");
const cors = require("cors");
var expressWs = require("express-ws");

const { client } = require("./server/config/config.cjs");
const { getCategories } = require("./server/helpers.cjs");

const productApi = require("./server/api/product.cjs");
const checkoutApi = require("./server/api/checkout.cjs");

// app initialization
const app = express();
expressWs(app);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/html"));
app.use("/node_modules", express.static(__dirname + "/node_modules/"));

// api routes
app.use("/api/products", productApi);
app.use("/api/checkout", checkoutApi);

// message websocket
app.ws("/ws/messages?:chat_room", async (ws, req) => {
  const chat_room = req.query.chat_room;

  const { data, error } = await client
    .from("messages")
    .select("*")
    .eq("chat_room", chat_room)
    .order("sent_at");

  if (error) {
    throw new Error(error);
  }

  if (data.length > 0) {
    ws.send(JSON.stringify(data));
  }

  ws.on("message", async (msg) => {
    msg = JSON.parse(msg);

    await client
      .from("messages")
      .insert({
        chat_room: chat_room,
        message: msg.msg,
        is_client: msg.is_client,
      })
      .select();
  });

  client
    .channel("messages")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `chat_room=eq.${chat_room}`,
      },
      (p) => {
        ws.send(JSON.stringify(p.new));
      }
    )
    .subscribe();

  ws.on("close", () => {
    console.log("WebSocket connection closed!");
  });
});

// render routes
app.get("/", async (req, res) => {
  const categories = await getCategories();

  res.render("index", {
    categories: categories,
  });
});

app.get("/products", async (req, res) => {
  const categories = await getCategories();

  const category = req.query.category;

  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("category", category)
    .order("id");

  if (error) {
    throw new Error(error);
  }
  res.render("products", { products: data, categories: categories });
});

app.get("/product/:id", (req, res) => {
  res.render("product");
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
