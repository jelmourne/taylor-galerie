const express = require("express");
const path = require("path");
const cors = require("cors");
var expressWs = require("express-ws");

const { client } = require("./server/config/config.cjs");
const { getCategories } = require("./server/helpers.cjs");

const productApi = require("./server/api/product.cjs");
const checkoutApi = require("./server/api/checkout.cjs");
const emailApi = require("./server/api/email.cjs");

// app initialization
const app = express();
expressWs(app);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/html"));
app.use("/node_modules", express.static(__dirname + "/node_modules/"));

// api routes
app.use("/api/products", productApi);
app.use("/api/checkout", checkoutApi);
app.use("/api/email", emailApi);

// message websocket
app.ws("/ws/messages?:chat_room", async (ws, req) => {
  const chat_room = req.query.chat_room;

  if (chat_room === null) {
    return;
  }

  const { data, error } = await client
    .from("messages")
    .select("*")
    .eq("chat_room", chat_room)
    .order("sent_at");

  if (data.length > 0 && data != null) {
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

  ws.on("close", () => {});
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
    .eq("subcategory", category)
    .order("id");

  if (error) {
    throw new Error(error);
  }
  res.render("products", { products: data, categories: categories });
});

app.get("/product/:id", async (req, res) => {
  const categories = await getCategories();

  const id = req.params.id;

  if (!id) {
    return;
  }

  const { data, error, similar } = await client
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
  }

  res.render("product", {
    product: data,
    categories: categories,
  });
});

app.get("/contact", async (req, res) => {
  const categories = await getCategories();
  res.render("contact", { categories: categories });
});

app.get("/*", async (req, res) => {
  const categories = await getCategories();
  res.render("error", { categories: categories });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
