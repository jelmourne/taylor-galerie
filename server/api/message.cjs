require("dotenv").config();

app.post("/messages", async (req, res) => {
  const { id, message, is_client } = req.body;

  if (!id) {
    return;
  }

  const { data, error } = await client
    .from("messages")
    .insert({ chat_room: id, message: message, is_client: is_client })
    .select();

  if (error) {
    throw new Error(error);
  }
  res.send(data);
});

app.get("/messages?:chat_room", async (req, res) => {
  const chat_room = req.query.chat_room;

  const { data, error } = await client
    .from("messages")
    .select("*")
    .eq("chat_room", chat_room)
    .order("sent_at");

  if (error) {
    console.log(error);
  }

  res.send(data);
});
