const Discord = require('discord.js');
module.exports = {
    name: 'nick',
    description: "Nicks the message.member.userSetNickname(lol)",
    execute(message, args){
     message.channel.send(`This command is disabled.`)
    }
};