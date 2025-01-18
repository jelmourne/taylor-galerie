const express = require("express");
const { mail } = require("../config/config.cjs");

router = express.Router();

router.post("/", async (req, res) => {
  const params = req.body.form;

  msg = {
    to: "contact@taylorgalerie.com",
    from: "contact@taylorgalerie.com",
    subject: `${params.subject} [${params.email}]`,
    text: params.inquiry,
  };

  await mail.send(msg);
});

module.exports = router;
