const supabase = require("@supabase/supabase-js");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

exports.client = supabase.createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SK
);

exports.stripe = require("stripe")(process.env.STRIPE_SK);

exports.mail = sgMail.setApiKey(process.env.SGMAIL_SK);
