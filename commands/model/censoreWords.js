const mongoose = require("mongoose");

const censoreWords = mongoose.Schema({
  guildID: String,
  guildName: String,
  Words: Array(),
});

module.exports = mongoose.model("censore", censoreWords);
