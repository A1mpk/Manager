const Discord = require("discord.js");
module.exports = {
  name: "karen",
  description: "Karen command ofc",
  disabled: false,
  execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );

    let karenquestions = [
      "Can I speak to the Manager?",
      "WOAH YOUNG HUMAN!What do you think you are doing?",
      "Do you really wanna test me?",
      "Do you support Karen's life matter?",
      "Can I know why was my raw chicken not cooked?",
    ];
    let counter = 0;

    const filter = (m) => m.author.id === message.author.id;

    const collector = new Discord.MessageCollector(message.channel, filter, {
      max: karenquestions.length,
      time: 60000, //15s
    });
    message.channel.send(karenquestions[counter++]);
    collector.on("collect", (m) => {
      if (counter < karenquestions.length) {
        m.channel.send(karenquestions[counter++]);
      }
    });
    collector.on("end", (collected) => {
      const Reply = [
        "You won, Karen got crippling depression",
        "You lost, Karen won!",
        "Tie..Karen asks for a rematch!",
        "Karen calls the police on you and you get arrested!",
      ];
      let counter = 0;
      message.channel.send(Reply[Math.floor(Math.random() * Reply.length)]);
    });
  },
};
