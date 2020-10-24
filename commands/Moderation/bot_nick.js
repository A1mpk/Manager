const Discord = require('discord.js');
module.exports = {
    name: 'bot_nick',
    description: "Nicks the message.member.userSetNickname(lol)",
    execute(message, args, client){
        const lol = message.content.slice(9)
        const LOL = new Discord.MessageEmbed()
        .setColor(15105570)
        .setAuthor('BOT_NICK - MODERATION')
        .setDescription(`Changes the bot's nickname.`)
        .addField('USAGE : `bot_nick <nickname>`', "** **")
        .setTimestamp()
       if(message.member.hasPermission('CHANGE_NICKNAME')){
           if(!lol){
            message.channel.send(LOL)
        }
        if(lol){
            message.guild.me.setNickname(lol)
    
            
            message.channel.send(`My nickname is now **${lol}**.`)
        }
       }else message.channel.send('You need `CHANGE_NICKNAME` to use this command.')
    }

};