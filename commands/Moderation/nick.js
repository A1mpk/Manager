const Discord = require('discord.js');
module.exports = {
    name: 'nick',
    description: "Nicks the message.member.userSetNickname(lol)",
    execute(message, args){
        const lol = message.content.slice(5)
        const LOL = new Discord.MessageEmbed()
        .setColor(15105570)
        .setAuthor('NICK - MODERATION')
        .setDescription(`Changes your nickname.`)
        .addField('USAGE : `nick <nickname>`', "** **")
        .setTimestamp()
       if(message.member === message.guild.owner){
            message.channel.send(`I cannot change the Owner's nickname.`)
       }else
       if(message.member.hasPermission('CHANGE_NICKNAME')){
           if(!lol){
            message.channel.send(LOL)
        }
        if(lol){
            message.member.setNickname(lol)
            if(message.member === message.guild.owner) return;
            
            message.channel.send(`Your nickname on this server has been changed to **${lol}.**`)
        }
       }else message.channel.send('You need `CHANGE_NICKNAME` to use this command.')
    }

};