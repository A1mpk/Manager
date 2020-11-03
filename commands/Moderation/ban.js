const Discord = require('discord.js')
module.exports = {
    name: 'ban',
    description: "BANS A MEMBER BRUH",
    execute(message, args){
        const Ban = new Discord.MessageEmbed()
         .setTitle('BAN - MODERATION')
         .setDescription("Bans a member from the guild.")
         .addField("USAGE : `ban <user> <reason>`", "** **")
         .setTimestamp()
         .setColor(3066993)
         
        
         const Buser = message.guild.member(message.mentions.users.first())
         if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('ERROR : Missing Permissions');
         if(!Buser) return message.channel.send(Ban); 
         let bReason = args.join(" ").slice(22);
         if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You need to be an Admin to use this command.');
         const BanMod = new Discord.MessageEmbed()
         .setColor(3066993)
         .setAuthor('BAN ERROR')
         .setDescription('I cannot ban that user.')
         .addField('Reason : ', "Person has a higher role than me or has the same permissions as me")
         if(Buser.hasPermission("ADMINISTRATOR")) return message.channel.send(BanMod);
   
        
   
         
   
        
          message.channel.send(`I have banned the member ${Buser} for ${bReason}`)
          message.author.send(`You have banned the member ${Buser} for ${bReason}`)
          message.guild.member(Buser).ban(bReason)
          Buser.send(`You have been banned for ${bReason}, please contact ${message.guild.owner.tag}`)
   
          return;
    }
}