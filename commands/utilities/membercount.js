const Discord = require("discord.js");

module.exports = {
  name: "membercount",
  description: "Gets member count of guild.",
  disabled: false,
  execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );

    const MemberCount = new Discord.MessageEmbed()
      .setTitle(`Members in ${message.guild.name}`)
      .setDescription(`${message.guild.memberCount}`)
      .setTimestamp()
      .setColor("#339295");
    message.channel.send(MemberCount);
  },
};
