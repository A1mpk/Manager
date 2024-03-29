const Discord = require("discord.js");


module.exports = {
  name: "rule_add",
  description: "Shows member's rank.",
  disabled: true,
  execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );

    if (message.member.hasPermission("MANAGE_CHANNELS")) {
      let args3 = message.content.slice(10);

      if (!args3) {
        const ARGSNEEDED2 = new Discord.MessageEmbed()
          .setTitle("RULE_ADD - MODERATION")
          .setDescription(
            '`>rule_add <rules>` - This command is designed to add rules for the guild. It does comes with a sample phrase starting with "Welcome to server name, and here are the rules you should follow :". From there you will have to complete the rules. You can also use customizable fonts!'
          )

          .setTimestamp()
          .setColor("#339295");
        message.channel.send(ARGSNEEDED2);
      }

      const custom4_message = new Discord.MessageEmbed()
        .setColor("#339295")
        .setAuthor("Rules")
        .setDescription(`Welcome to **${message.guild.name}**, and here are the rules you should follow : 
              ${args3}`);
      if (args3) {
        message.channel.send(custom4_message);
      }
    } else
      message.channel.send("You do not have permissions to use this command.");
  },
};
