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

async function getSimilarProducts(product) {
  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("category", product.category)
    .neq("id", product.id)
    .order("id")
    .limit(10);

  if (error) {
    throw new Error(error);
  }

  return data;
}

exports.getCategories = getCategories;
exports.getSimilarProducts = getSimilarProducts;
