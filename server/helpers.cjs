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

function verifyRequest(req, res, next) {
  const allowedOrigin = "https://taylorgalerie.com";
  const origin = req.get("origin");

  if (origin && origin.startsWith(allowedOrigin)) {
    next();
  } else {
    return res
      .status(403)
      .send("Forbidden: You are not authorized to access this resource");
  }
}

exports.getCategories = getCategories;
exports.getSimilarProducts = getSimilarProducts;
exports.verifyRequest = verifyRequest;
