const Discord = require("discord.js");
module.exports = {
  name: "credit",
  description: "Announces a rule or a normal announcement",
  disabled: false,
  execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );

    const ARGSN2EEDED = new Discord.MessageEmbed()
      .setTitle("CREDIT - MODERATION")
      .setDescription(
        "`>credit <mention>` - Credit a member for their fantastic work. [Example](https://gyazo.com/8cda39aa907a69088f494c2d322f6c1f)"
      )

      .setTimestamp()
      .setColor("#339295");
    const custo3m_message = new Discord.MessageEmbed()
      .setColor("#339295")

      .setDescription(`Credits to ${args}`);
    if (message.member.hasPermission("MANAGE_CHANNELS")) {
      let args = message.content.slice("8");

      if (!args) {
        message.channel.send(ARGSN2EEDED);
      } else if (args) {
        message.channel.send(custo3m_message);
        if (message.deletable) {
          message.delete();
        }
      }
    } else
      message.channel.send("You do not have permissions to use this command.");
  },
};
