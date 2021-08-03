const Discord = require("discord.js");

module.exports = {
  name: "dogwater",
  description: "Literally dog meters you",
  disabled: false,
  execute(message, args) {
    const randomXp = Math.floor(Math.random() * 100) + 1;
    const user = message.mentions.users.first() || message.author;
  const Dogwater = new Discord.MessageEmbed()
  .setTitle(`Let's see who's dogwater...`)
  .setDescription(`${user} is ${randomXp}% dogwater!`)
   .setColor('#339295')
   message.channel.send(Dogwater)
  },
};
