const express = require("express");
const { client } = require("../config/config.cjs");

router = express.Router();

async function getCategory(category) {
  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("category", category)
    .order("id");
  if (error) {
    throw new Error(error);
  }

  return data;
}

router.get("/?:category", async (req, res) => {
  const category = req.query.category;

  if (category) {
    const data = await getCategory(category);
    res.send(data);
    return;
  }
  const { data, error } = await client.from("products").select("*").order("id");

  if (error) {
    throw new Error(error);
  }

  res.send(data);
});

router.get("/product?:id", async (req, res) => {
  const id = req.query.id;

  if (!id) {
    return;
  }

  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error);
  }

  res.send(data);
});

router.get("/search?:name", async (req, res) => {
  const name = req.query.name;

  if (!name) {
    return;
  }

  const { data, error } = await client
    .from("products")
    .select("*")
    .ilike("name", `%${name}%`)
    .limit(4);

  if (error) {
    throw new Error(error);
  }

  res.send(data);
});

router.get("/similar?:id?:category", async (req, res) => {
  const { id, category } = req.query;

  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("category", category)
    .neq("id", id)
    .order("id")
    .limit(10);

  if (error) {
    console.log(error);
  }

  res.send(data);
});

module.exports = router;
