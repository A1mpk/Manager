const Discord = require('discord.js')

module.exports = {
    name: 'kick',
    description: "kicks a member",
    execute(message, args){
const Kick = new Discord.MessageEmbed()
         .setTitle('ERROR')
         .addField('*I cant find that user.*','Here is an exemple on how to kick a user.')
         .addField('You can do /kick @Dream {Reason if needed}.','If that doesnt work')
         .addField('You can use our command /whois @Dream','Which will check if the user is in the guild.')
         .setColor(15158332)
        
         const Kuser = message.guild.member(message.mentions.users.first())
         if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('no');
         if(!Kuser) return message.channel.send(Kick); 
         let kReason = args.join(" ").slice(22);
         if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('You need to be an Admin to use this command.');
         const KickMod = new Discord.MessageEmbed()
         .setColor(15158332)
         .setTitle('ERROR')
         .setDescription('I cant kick that person.')
         .addField('Reason : ', "Person has a higher role than me or has the same permissions as me")
         if(Kuser.hasPermission("ADMINISTRATOR")) return message.channel.send(KickMod);
   
          message.guild.member(Kuser).kick(kReason);
         Kuser.send(`You were kicked from the server! Reason : ${`kReason`}`)
         message.author.send(`You kicked ${`Kuser`} with the reason of ${`kReason`}`)
          message.channel.send(`I have kicked ${`Kuser`} with the reason of : ${`kReason`}`)
           return;
    }
}