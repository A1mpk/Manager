const Discord = require("discord.js");
module.exports = {
  name: "bot_nick",
  description: "Nicks the message.member.userSetNickname(lol)",
  disabled: false,
  execute(message, args, client) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );

    const lol = message.content.slice(9);
    const LOL = new Discord.MessageEmbed()
      .setColor("#339295")
      .setAuthor("BOT_NICK - MODERATION")
      .setDescription(
        "`>bot_nick <nickname>` - Changes nickname of [Mint](https://discord.com/api/oauth2/authorize?client_id=725787532008095744&permissions=8&scope=bot)."
      )
      .setTimestamp();
    if (!message.guild.me.hasPermission(["MANAGE_NICKNAMES"]))
      return message.channel.send(
        "I don`t have enough permissions. [`MANAGE_NICKNAMES]"
      );
    try {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        if (!lol) {
          message.channel.send(LOL);
        }
        if (lol) {
          if (lol.length > 32)
            return message.channel.send(
              `My nickname has more than 32characters, 32 is the max!`
            );
          if (lol.length < 32) {
            message.guild.me.setNickname(lol);
            message.channel.send(`My nickname is now **${lol}**.`);
          }
        }
      } else
        message.channel.send("You need `ADMINISTRATOR` to use this command.");
    } catch (er) {
      message.channel.send(`Something went wrong, please re-run this command.`);
    }
  },
};
