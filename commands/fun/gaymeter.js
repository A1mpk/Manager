const Discord = require("discord.js");

module.exports = {
  name: "gaymeter",
  description: "Literally gay meters you",
  disabled: false,
  execute(message, args) {
    const randomXp = Math.floor(Math.random() * 100) + 1;
    const user = message.mentions.users.first() || message.author;
    const GayMeter= new Discord.MessageEmbed()
    .setTitle(`Let's see who's gayer...`)
    .setDescription(`${user} is ${randomXp}% gay!`)
     .setColor('#339295')
    message.channel.send(
      GayMeter
    );
  },
};
