const Discord = require('discord.js');

module.exports = {
    name: 'exemple',
    description: "shows exemple",
    execute(message, args){
     message.channel.send('https://pastebin.com/b75Khj68');
    }

};