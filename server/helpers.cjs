const { client } = require("./config/config.cjs");

var categories = [];

async function getCategories() {
  if (categories.length) {
    return categories;
  }

  const { data, error } = await client
    .from("products")
    .select("subcategory")
    .order("subcategory");

  if (error) {
    throw new Error(error);
  }
  categories = [...new Set(data.map((e) => e.subcategory))];

  return categories;
}

async function getSimilarProducts(product) {
  const [id, category] = await product;

  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("subcategory", category)
    .neq("id", id)
    .order("id")
    .limit(10);

  if (error) {
    console.log(error);
  }

  return data;
}

exports.getCategories = getCategories;
exports.getSimilarProducts = getSimilarProducts;
