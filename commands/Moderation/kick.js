const Discord = require('discord.js')

module.exports = {
    name: 'kick',
    description: "kicks a member",
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
const Kick = new Discord.MessageEmbed()
         .setTitle('KICK - MODERATION')
         .setDescription('Kicks a member of the guild.')
         .addField("USAGE : `kick <user> <reason>`", "** **")
         .setColor("ORANGE")
         .setTimestamp()
         if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('You need KICK_MEMBERS to use this command.');
         const Kuser = message.guild.member(message.mentions.users.first())
         if(!Kuser) return message.channel.send(Kick); 
         let kReason = args.join(" ").slice(22);
         const KickMod = new Discord.MessageEmbed()
         .setColor("ORANGE")
         .setTitle('ERROR')
         .setDescription('I cant kick that person.')
         .addField('Reason : ', "Person has a higher role than me or has the same permissions as me")
         .setFooter(`Command raised by ${message.member.user.tag}`)
         if(Kuser.hasPermission("KICK_MEMBERS")) return message.channel.send(KickMod);
   
          message.guild.member(Kuser).kick(kReason);
         Kuser.send(`You were kicked from the server! Reason : ${kReason}`)
          message.channel.send(`I have kicked ${Kuser} with the reason of : ${kReason}`)
           return;
    }
}