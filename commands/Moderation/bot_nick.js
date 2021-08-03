const Discord = require("discord.js");
module.exports = {
  name: "bot_nick",
  description: "Nicks the message.member.userSetNickname(lol)",
  disabled: false,
  execute(message, args, client) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );
      const Permission = new Discord.MessageEmbed()
      .setTitle('I need permissions!')
      .setDescription('Im missing ``**MANAGE_NICKNAMES**`` permissions!')
      .setColor('#339295')
      const Permission2 = new Discord.MessageEmbed()
      .setTitle('You need permissions!')
      .setDescription('You\'re missing ``**MANAGE_NICKNAMES**`` permissions!')
      .setColor('#339295')
    const lol = message.content.slice(9);
    const LOL = new Discord.MessageEmbed()
    .setTitle('Missing Nickname..')
    .setDescription('You didnt write my new nickname!')
    .setColor('#339295')
   
    const OwnerPriv = new Discord.MessageEmbed()
    .setTitle('Max Characters')
    .setDescription('My nickname contains more than 32 characters!')
    .setColor('#339295')
 
    const ChangedNick = new Discord.MessageEmbed()
    .setTitle('Changed Nickname')
    .setDescription('I just changed my nickname as you wanted.')
    .setColor('#339295')
    
    if (!message.guild.me.hasPermission(["MANAGE_NICKNAMES"])){
      message.channel.send(Permission)
    }
    try {
      if (message.member.hasPermission("ADMINISTRATOR")) {
        if (!lol) {
          message.channel.send(LOL);
        }
        if (lol) {
          if (lol.length > 32){
            message.channel.send(OwnerPriv)
            return undefined
          }
          if (lol.length < 32) {
            message.guild.me.setNickname(lol);
            message.channel.send(ChangedNick);
            return undefined
          }
        }
      } else
        message.channel.send(Permission2);
    } catch (er) {
      message.channel.send(`Something went wrong, please re-run this command.`);
    }
  },
};
