const Discord = require('discord.js')
module.exports = {
    name: 'ban',
    category: 'Moderation',
    description: 'Bans a member',
    usage: `ban <user> <reason>`,
    run: async (client, message, args) => {
        const Ban = new Discord.MessageEmbed()
         .setAuthor('ERROR')
         .setDescription('Please check if you mentionned a user.')
         .setColor(15158332)
         
        
         const Buser = message.guild.member(message.mentions.users.first())
         if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('no');
         if(!Buser) return message.channel.send(Ban); 
         let bReason = args.join(" ").slice(26);
         if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You need to be an Admin to use this command.');
         const BanMod = new Discord.MessageEmbed()
         .setColor(15158332)
         .setAuthor('BAN ERROR')
         .setDescription('I cannot ban that user.')
         .addField('Reason : ', "Person has a higher role than me or has the same permissions as me")
         if(Buser.hasPermission("ADMINISTRATOR")) return message.channel.send(BanMod);
   
         const BanEmbed = new Discord.MessageEmbed()
         .setColor(15158332)
         .addField("Banned", `${Buser}`)
         .addField("User banned by", `<@${message.author.id}>`)
         .addField("Reason", bReason);
   
         let BanChannel = message.guild.channels.cache.find(channel => channel.id === "649018122476584991");
         if(!BanChannel) return message.channel.send('Please create a channel named "incidents".');
   
          message.guild.member(Buser).ban(bReason);
   
          BanChannel.send(BanEmbed)
   
          return;
    }
}