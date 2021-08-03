const Discord = require("discord.js");

module.exports = {
  name: "kick",
  description: "kicks a member",
  disabled: false,
  execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );

      const Kick = new Discord.MessageEmbed()
      .setTitle('Who are you kicking?')
      .setDescription('You didn\'t mention who you\'re kicking.')
      .setColor('#339295')
   
      const Permission = new Discord.MessageEmbed()
      .setTitle('I need permissions!')
      .setDescription('Im missing ``**KICK_MEMBERS**`` permissions!')
      .setColor('#339295')
      const Permission2 = new Discord.MessageEmbed()
      .setTitle('You need permissions!')
      .setDescription('You\'re missing ``**KICK_MEMBERS**`` permissions!')
      .setColor('#339295')
    if (!message.guild.me.hasPermission(["KICK_MEMBERS"])){
  
      message.channel.send(Permission)
      return undefined
    }
      if(!message.member.hasPermission("KICK_MEMBERS")){
        
        message.channel.send(Permission2)
        return undefined
    }
    const Kuser = message.guild.member(message.mentions.users.first());
    if (!Kuser) return message.channel.send(Kick);
    let kReason = message.content.slice(28)
    const KickMod = new Discord.MessageEmbed()
    .setTitle(`Woah buddy chill..`)
    .setDescription(`${Kuser}'s permissions are the same as yours.`)
    .setColor("#339295")
    .setTimestamp()
    if (Kuser.hasPermission("KICK_MEMBERS"))
      return message.channel.send(KickMod);

    message.guild.member(Kuser).kick(kReason);
    const Sucess = new Discord.MessageEmbed()
    .setTitle('Banned em!')
    .setDescription(`Sucessfully kicked ${Kuser.user.tag} for ${kReason|| 'No reason given'}`)
    .setColor("#339295")
    message.channel.send(Sucess);
    return undefined
  },
};
