const Discord = require("discord.js");
const AutoRoleSchema = require("../model/AutoRole");
const mongo = require("mongoose");

module.exports = {
  name: "autorole_remove",
  description: "a",
  disabled: false,
  async execute(message, args, client) {
    if (!message.member.hasPermission("ADMINISTRATOR")){
      const Permission = new Discord.MessageEmbed()
.setTitle('You need permissions!')
.setDescription('You\'re missing ``**ADMINISTRATOR**`` permissions!')
.setColor('#339295')
message.channel.send(Permission)
    }

    try {
      try {
        await AutoRoleSchema.findOneAndDelete({
          _id: message.guild.id,
        });
        message.channel.send(`Cleared all roles from autorole.`);
      } catch (er) {
        return message.channel.send(`Autorole was not set for this guild.`);
      }
    } catch (er) {
      message.channel.send(er);
    }
  },
};
