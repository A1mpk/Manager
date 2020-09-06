const Discord = require('discord.js')
const client = new Discord.Client();
const ms = require('ms')
module.exports = {
    name: 'uptime',
    description: "uptime of bot",
    execute(message, args){
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
 
        
         
        message.channel.send(`The bot has been running for\n${hours}h ${minutes}m ${seconds}s`)
        console.log(`The bot has been running for\n${hours}h ${minutes}m ${seconds}s.`)
    }
};
