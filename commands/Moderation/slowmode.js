const Discord = require("discord.js");

module.exports = {
  name: "slowmode",
  description: "Slowmode to the channel.",
  disabled: false,
  execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );
      const Permission = new Discord.MessageEmbed()
      .setTitle('I need permissions!')
      .setDescription('Im missing ``**MANAGE_ROLES**`` permissions!')
      .setColor('#339295')
      const Permission2 = new Discord.MessageEmbed()
      .setTitle('You need permissions!')
      .setDescription('You\'re missing ``**MANAGE_ROLES**`` permissions!')
      .setColor('#339295')
    if (!message.guild.me.hasPermission(["MANAGE_CHANNELS"])){
      message.channel.send(Permission)
      return undefined
    }
    const aaa = message.content.split(" ").slice(1);
    const amount = aaa.join(" ");
    const h69 = new Discord.MessageEmbed()
      .setTitle("SLOWMODE - MODERATION")
      .setDescription(
        "`>slowmode <amount>` - This is a slowmode command which sets the message cooldown for this channel."
      )

      .setColor("#339295")
      .setTimestamp();


    if (message.member.hasPermission(["MANAGE_CHANNELS"])) {
      if (!amount){
        const Permission2 = new Discord.MessageEmbed()
        .setTitle('You forgot to enter something..')
        .setDescription('You need to enter the slowmode seconds.')
        .setColor('#339295')
        message.channel.send('**Tip**: You can view the usage of this command by running `**help moderation**`.', Permission2)
        return undefined
      }
      if (isNaN(amount)){
        const Permission2 = new Discord.MessageEmbed()
        .setTitle('Numbers?')
        .setDescription(`I don't see no numbers...`)
        .setColor('#339295')
        message.channel.send(Permission2)
        return undefined
      }
      if (amount > 21600){
        const Permission2 = new Discord.MessageEmbed()
        .setTitle('More than max? Wow!')
        .setDescription(`Problemo! The maximum seconds is 21600!`)
        .setColor('#339295')
        message.channel.send(Permission2)
        return undefined
      }
      const Chane = new Discord.MessageEmbed()
        .setTitle('Current Slowmode')
        .setDescription(`The current slowmode is at ${amount}s.`)
        .setColor('#339295')
      message.channel.setRateLimitPerUser(amount);
      message.channel.send(Chane);
    } else message.channel.send(Permission2)
  },
};
