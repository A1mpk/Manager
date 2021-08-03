const Discord = require("discord.js");

module.exports = {
  name: "ban",
  description: "a",
  disabled: false,
  execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );

      const Ban = new Discord.MessageEmbed()
      .setTitle('Who are you banning?')
      .setDescription('You didn\'t mention who you\'re banning.')
      .setColor('#339295')
   
      const Permission = new Discord.MessageEmbed()
      .setTitle('I need permissions!')
      .setDescription('Im missing ``**BAN_MEMBERS**`` permissions!')
      .setColor('#339295')
      const Permission2 = new Discord.MessageEmbed()
      .setTitle('You need permissions!')
      .setDescription('You\'re missing ``**BAN_MEMBERS**`` permissions!')
      .setColor('#339295')
    if (!message.guild.me.hasPermission(["BAN_MEMBERS"])){
  
      message.channel.send(Permission)
      return undefined
    }
      if(!message.member.hasPermission("BAN_MEMBERS")){
        
        message.channel.send(Permission2)
        return undefined
    }
    const Buser = message.guild.member(message.mentions.users.first());
    if (!Buser) return message.channel.send(Ban);
    let bReason = message.content.slice(27)


    const BanMod = new Discord.MessageEmbed()
    .setTitle(`Woah buddy chill..`)
    .setDescription(`${Buser}'s permissions are the same as yours.`)
    .setColor("#339295")
    .setTimestamp()
    if (Buser.hasPermission("BAN_MEMBERS")) return message.channel.send(BanMod);
    try {
      message.guild.member(Buser).ban({ reason: bReason });
      const Sucess = new Discord.MessageEmbed()
      .setTitle('Banned em!')
      .setDescription(`Sucessfully banned ${Buser.user.tag} for ${bReason|| 'No reason given'}`)
      .setColor("#339295")
    message.channel.send(Sucess)
      return;
    } catch (er) {
      message.channel.send(
        `We ran into an error. Ask for help in the support server.`
      );
    }
  },
};
