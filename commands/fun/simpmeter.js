const Discord = require("discord.js");

module.exports = {
  name: "simpmeter",
  description: "Literally gay meters you",
  disabled: false,
  execute(message, args) {
    const randomXp = Math.floor(Math.random() * 100) + 1;
    const user = message.mentions.users.first() || message.author;
    const Simp= new Discord.MessageEmbed()
    .setTitle(`Let's see who's a simp...`)
    .setDescription(`${user} is ${randomXp}% simping!`)
     .setColor('#339295')
    message.channel.send(
      Simp
    );
  },
};
