const Discord = require('discord.js');
module.exports = {
    name: 'nick',
    description: "Nicks the message.member.userSetNickname(lol)",
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        
        if(!message.guild.me.hasPermission(['MANAGE_NICKNAMES']))return message.channel.send('I don\'t have enough permissions to ban a user. [`MANAGE_NICKNAMES`]');
        const lol = message.content.slice(5)
        const LOL = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setAuthor('NICK - MODERATION')
        .setDescription('`>nick <nickname>` - This is a nickname command which can only change your nickname on the server.')
      
        .setTimestamp()
       if(message.member === message.guild.owner){
            message.channel.send(`I cannot change the Owner's nickname.`)
       }else
       if(message.member.hasPermission('CHANGE_NICKNAME')){
           if(!lol){
            message.channel.send(LOL)
        }
        if(lol){
            if(lol.length >32) return message.channel.send(`Your nickname has more than 32characters, 32 is the max!`);
            if(lol.length <1){
               message.channel.send(`You do not have enough of characters to set a nickname.`)
            }else
        
            message.member.setNickname(lol)
            if(message.member === message.guild.owner) return;
            message.channel.send(`Your nickname on this server has been changed to **${lol}.**`)
        }
       }else message.channel.send('You need `CHANGE_NICKNAME` to use this command.')
    
    }
};