const Discord = require("discord.js");
module.exports = {
  name: "credits",
  description: "credits",
  disabled: false,
  async execute(message, args, client) {
    const Owner = client.users.cache.find(
      (user) => user.id === "368148684468387840"
    );
    const CoOwner = client.users.cache.find(
      (user) => user.id === "503186950295912458"
    );

    const CreditsEmbed = new Discord.MessageEmbed()
      .setAuthor(`Credits for Mint`, message.guild.me.user.displayAvatarURL())

      .addField(`Coders[2]`, `${Owner.tag} + ${CoOwner.tag} `)
      .addField(`Mint Avatar[1]`, "Nameless")
      .setColor("#339295")
      .setTimestamp()
      .setThumbnail(message.guild.me.user.displayAvatarURL());

    message.channel.send(CreditsEmbed);
  },
};
