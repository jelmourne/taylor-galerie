const supabase = require("@supabase/supabase-js");
require("dotenv").config();

exports.client = supabase.createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SK
);

exports.stripe = require("stripe")(process.env.STRIPE_SK);
