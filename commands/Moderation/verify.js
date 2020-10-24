const Discord = require('discord.js')
const guild = require('./guild')

module.exports = {
    name: 'verify',
    description: "Verify system",
    execute(message, args){
        message.channel.send('20435021')
    }
}