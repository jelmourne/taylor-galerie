const express = require("express");
require("dotenv").config();

router = express.Router();

const supabase = require("@supabase/supabase-js");

const client = supabase.createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SK
);

router.post("/messages", async (req, res) => {
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

router.get("/messages?:chat_room", async (req, res) => {
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

module.exports = router;
