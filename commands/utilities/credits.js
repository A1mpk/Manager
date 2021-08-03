const Discord = require("discord.js");
module.exports = {
  name: "credits",
  description: "credits",
  disabled: true,
  async execute(message, args, client) {
    const Owner = client.users.cache.find(
      (user) => user.id === "368148684468387840"
    );
    const CoOwner = client.users.cache.find(
      (user) => user.id === "503186950295912458"
    );

    const CreditsEmbed = new Discord.MessageEmbed()
     

   
      .setColor("#339295")
     
      .setDescription(`**Owner(s)[1]**: ${Owner}, **Mint Avatar[1]**: Nameless `)
  

    message.channel.send(CreditsEmbed);
  },
};
