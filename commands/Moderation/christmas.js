const Discord = require('discord.js');

module.exports = {
    name: 'christmas',
    description: "pings everyone",
    execute(message, args){
        setInterval(function() {
            message.channel.send('@everyone happy christmas!')
      }, 1000);
    }

};