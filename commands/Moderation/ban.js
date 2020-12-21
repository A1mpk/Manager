const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'a',
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        const Ban = new Discord.MessageEmbed()
        .setTitle('BAN - MODERATION')
        .setDescription("Bans a member from the guild.")
        .addField("USAGE : `ban <user> <reason>`", "** **")
        .setTimestamp()
        .setColor(3066993)
        
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You need to be an Admin to use this command.');
        const Buser = message.guild.member(message.mentions.users.first())
        if(!Buser) return message.channel.send(Ban); 
        let bReason = args
       
        const BanMod = new Discord.MessageEmbed()
        .setColor(3066993)
        .setAuthor('BAN ERROR')
        .setDescription('I cannot ban that user.')
        .addField('Reason : ', "Person has a higher role than me or has the same permissions as me")
        if(Buser.hasPermission("BAN_MEMBERS")) return message.channel.send(BanMod);
        try{
           message.guild.member(Buser).ban({reason: bReason})
           Buser.send(`You were banned banned ${Buser} with the reason of : ${bReason}`)
             return;
        }catch(er){
            message.channel.send(`Sometime went wrong!`)
        }

    }
};