const mongoose = require("mongoose");
const Guild = require("../commands/model/guild");
const guild = require("../commands/model/guild");
const Discord = require("discord.js");

module.exports = async (client, guild) => {
  guild = new Guild({
    _id: mongoose.Types.ObjectId(),
    guildID: guild.id,
    guildName: guild.name,
  });
  guild
    .save()
    .then((result) => console.log(result))
    .catch((err) => console.error(err));

  console.log(`I have joined a guild.`);
};
