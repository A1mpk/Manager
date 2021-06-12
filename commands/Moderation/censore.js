const Discord = require("discord.js");
module.exports = {
  name: "censore",
  description: "Censoring Words",
  disabled: false,
  execute(message, args, client) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );

      
  },
};
