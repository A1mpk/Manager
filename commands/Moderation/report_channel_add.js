const Discord = require("discord.js");
const client = new Discord.Client();
module.exports = {
  name: "report_channel_add",
  description: "Report new categoryn",
  disabled: false,
  async execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );

    // CHECKING FOR PERMISSIONS
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        `I need MANAGE_CHANNELS to use this command.`
      );
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        `You need MANAGE_CHANNELS to use this command.`
      );

    // CHECKING FOR STUFF LIKE ARGUMENTS, ROLE MENTIONS & ROLES-DESCRIPTION.
    const Arguments = message.content.slice("20");
    if (!Arguments)
      return message.channel.send(
        `You need to enter the channel name you want me to log the reports🧍‍♂️`
      );

    const ChannelIdentifier = message.guild.channels.cache.find(
      (Channel) => Arguments === Channel.name
    );
    if (!ChannelIdentifier)
      return message.channel.send(
        `I can't find that channel, make sure you've copy pasted the exact name of the channel.`
      );

    const ReportData = require("../model/ReportData");
    if (!ReportData) return console.error("REPORT DATA WAS DELETED.");

    try {
      try {
        await ReportData.findOneAndUpdate(
          {
            guildID: message.guild.id,
          },
          {
            guildID: message.guild.id,
            guildName: message.guild.name,
            reportChannel: ChannelIdentifier.id,
          },
          {
            upsert: true,
          }
        );

        message.channel.send(
          `You will now get new reports in ${ChannelIdentifier}`
        );
      } catch (er) {
        return message.channel.send(er);
      }
    } catch (er) {
      message.channel.send(er);
    }
  },
};
