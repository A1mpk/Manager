const Discord = require('discord.js')
module.exports = { 
    name: "giverole",
    description: "Give role comand.",
    execute(message, args){
       message.channel.send(`This command has been disabled.`)
    }
}