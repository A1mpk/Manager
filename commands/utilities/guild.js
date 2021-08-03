const Discord = require("discord.js");
module.exports = {
  name: "guild",
  description: "Basic Information of the guild.",
  disabled: false,
  execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );

    const GuildInfo = new Discord.MessageEmbed()
      
 
      
      .setDescription(`**Owner**: ${message.guild.ownerID}, **Members**: ${message.guild.memberCount}, **Created**: ${message.guild.createdAt}, **Channels**: ${message.guild.channels.cache.size}, **Roles**: ${message.guild.roles.cache.size}`)
      .setColor("#339295");
    message.channel.send(GuildInfo);
  },
};
