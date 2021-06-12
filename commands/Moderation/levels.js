const Discord = require("discord.js");
const LevelsSchema = require("../model/levels");
module.exports = {
  name: "levels",
  description: "Levels",
  disabled: false,
  async execute(message, args) {
    const ANswer = message.content.slice(7);
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `You do not have ADMINISTRATOR mode to use this command.`
      );
    if (!ANswer) {
      const LEvelsNoNo = new Discord.MessageEmbed()
        .setAuthor("LEVELS - LEVELLING")
        .setDescription(
          "`>levels (enable/disable)` - Enable/Disable Levels category for this guild.."
        )
        .setTimestamp()

        .setColor("#339295");
      message.channel.send(LEvelsNoNo);
    } else if (ANswer.toLowerCase().includes("enable".toLowerCase())) {
      try {
        try {
          await LevelsSchema.findOneAndUpdate(
            {
              guildID: message.guild.id,
            },
            {
              levels: "enable",
              guildID: message.guild.id,
              guildName: message.guild.name,
            },
            {
              upsert: true,
            }
          );
          message.channel.send(`Levelling for this guild is enabled.`);
        } catch (er) {
          return message.channel.send(er);
        }
      } catch (er) {
        message.channel.send(er);
      }
    } else if (ANswer.toLowerCase().includes("disable".toLowerCase())) {
      try {
        try {
          await LevelsSchema.findOneAndUpdate(
            {
              guildID: message.guild.id,
            },
            {
              levels: "disable",
              guildID: message.guild.id,
              guildName: message.guild.name,
            },
            {
              upsert: true,
            }
          );
          message.channel.send(`Levelling for this guild is disabled.`);
        } catch (er) {
          return message.channel.send(er);
        }
      } catch (er) {
        message.channel.send(er);
      }
    } else message.channel.send(`That is not an option.`);
  },
};
