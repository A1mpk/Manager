const Discord = require('discord.js')
module.exports = {
    name: 'unmute',
    description: "UnMute member",
    execute(message, args){
        message.channel.send(`This command has been disabled.`)
    }
}