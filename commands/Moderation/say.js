const Discord = require("discord.js");
module.exports = {
  name: "say",
  description: "Say command.",
  disabled: false,
  execute(message, args) {
    const Util = require("./../../node_modules/discord.js/src/util/Util");
    let args2 = message.content.slice("4");
    const msg = Util.removeMentions(args2);
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );

    const everyone = "@everyone";
    const say = new Discord.MessageEmbed()
      .setAuthor("SAY - FUN")
      .setDescription(
        "`>say <message>` - This is a say command, it repeats your message."
      )
      .setTimestamp()

      .setColor("BLUE");
    if (!args2) {
      message.channel.send(say);
    } else message.channel.send(msg);
  },
};
