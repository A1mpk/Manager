const Discord = require("discord.js");

module.exports = {
  name: "eval",
  description: "Eval",
  disabled: false,
  execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );
    const OWNERID = "368148684468387840";
    const COOWNERID = "503186950295912458";
    const AK = new Discord.MessageEmbed()
      .setAuthor("ERROR")
      .setDescription("You do not own the bot.")
      .setColor("BLUE");
    if (message.author.id == COOWNERID) {
      try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

        message.channel.send(evaled, { code: "xl" });
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
      }
    }
    if (message.author.id == OWNERID) {
      try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

        message.channel.send(evaled, { code: "xl" });
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
      }
    }
  },
};
