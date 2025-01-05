const express = require("express");

router = express.Router();

router.post("/", async (req, res) => {
  const params = req.body.form;

  console.log(params);
});

module.exports = router;
