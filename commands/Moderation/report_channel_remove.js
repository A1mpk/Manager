const Discord = require("discord.js");
const client = new Discord.Client();
module.exports = {
  name: "report_channel_remove",
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

    const ReportData = require("../model/ReportData");
    if (!ReportData) return console.error("REPORT DATA WAS DELETED.");

    try {
      
      try {
        await ReportData.findOneAndDelete({
          guildID: message.guild.id,
        });

        message.channel.send(`Deleted the channel for reports.`);
      } catch (er) {
        return message.channel.send(er);
      }
    } catch (er) {
      message.channel.send(er);
    }
  },
};
