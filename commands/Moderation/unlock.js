
const Discord = require('discord.js')

module.exports = {
    name: 'lock',
    description: "Locks the channels",
    execute(message, args){
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        channels.forEach(channel => {
            channel.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: true
            }).then(() => {
           
            })
        })
    }
}