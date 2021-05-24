const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'a',
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
       
        const Ban = new Discord.MessageEmbed()
        .setTitle('BAN - MODERATION')
        .setDescription("`>ban <user> <reason>` - This will just ban the mentionned if provided with a reason.")
        
        .setTimestamp()
        .setColor("#35979a")
        if(!message.guild.me.hasPermission(['BAN_MEMBERS']))return message.channel.send('I don\'t have enough permissions to ban a user. [`BAN_MEMBERS`]');
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You need to be an Admin to use this command.');
        const Buser = message.guild.member(message.mentions.users.first())
        if(!Buser) return message.channel.send(Ban); 
        let bReason = args
       
        const BanMod = new Discord.MessageEmbed()
        .setColor("#35979a")
        .setAuthor('BAN ERROR')
        .setDescription('I cannot ban that user.')
        .addField('Reason : ', "Person has a higher role than me or has the same permissions as me")
        if(Buser.hasPermission("BAN_MEMBERS")) return message.channel.send(BanMod);
        try{
           message.guild.member(Buser).ban({reason: bReason})
           Buser.send(`You were banned ${Buser} with the reason of : ${bReason}`)
             return;
        }catch(er){
            message.channel.send(`We ran into an error. Ask for help in the support server.`)
        }

    }
};