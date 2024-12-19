const { client } = require("./config/config.cjs");

var categories = [];

async function getCategories() {
  if (categories.length) {
    return categories;
  }

  const { data, error } = await client
    .from("products")
    .select("category")
    .order("category");

  if (error) {
    throw new Error(error);
  }
  categories = [...new Set(data.map((e) => e.category))];

  return categories;
}

exports.getCategories = getCategories;
