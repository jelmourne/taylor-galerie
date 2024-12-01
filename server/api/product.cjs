const express = require("express");
require("dotenv").config();

router = express.Router();

const supabase = require("@supabase/supabase-js");

const client = supabase.createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SK
);

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

router.get("/categories", async (req, res) => {
  const { data, error } = await client
    .from("products")
    .select("category")
    .order("category");

  if (error) {
    throw new Error(error);
  }

  let filterData = [...new Set(data.map((e) => e.category))];

  res.send(filterData);
});

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

module.exports = router;
