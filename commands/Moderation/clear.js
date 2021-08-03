const Discord = require("discord.js");

module.exports = {
  name: "clear",
  description: "Clear's a amount of message.",
  disabled: false,
  execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );
      
    
      const Permission2 = new Discord.MessageEmbed()
      .setTitle('You need permissions!')
      .setDescription('You\'re missing ``**MANAGE_MESSAGES**`` permissions!')
      .setColor('#339295')
    const ClearHElped = new Discord.MessageEmbed()
      .setTitle("How many messages..")
      .setDescription("How many messages do you want me to clear?")
      .setColor("#339295");
    const NumberNeeded = new Discord.MessageEmbed()
      .setTitle("LETTERS?!!?")
      .setDescription("You gotta enter a number man...")
      .setColor("#339295");
    const Below100 = new Discord.MessageEmbed()
      .setTitle("Maximum...")
      .setDescription("Please enter an number below **100**.")
      .setColor("#339295");
    const Less100 = new Discord.MessageEmbed()
      .setTitle("Want me to delete 1 message...?")
      .setDescription("You really can't be serious.")
      .setColor("#339295");
    const Done= new Discord.MessageEmbed()
      .setTitle("There..")
      .setDescription(`I have cleared **${amount}** messages!`)
      .setColor("#339295");

    const aaa = message.content.split(" ").slice(1);
    const amount = aaa.join(" ");

    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      if (!amount) return message.channel.send(ClearHElped);
      if (isNaN(amount)) return message.channel.send(NumberNeeded);

      if (amount > 100)
        return message.channel.send(Below100);
      if (amount < 2) return message.channel.send(Less100);
      else
        message.channel.messages.fetch({ limit: amount }).then((messages) => {
          message.channel.bulkDelete(messages);
        });
      message.channel
        .send(Done)
        .then((m) => m.delete({ timeout: 5000 }));
    } else
      message.channel.send(Permission2);
  },
};
