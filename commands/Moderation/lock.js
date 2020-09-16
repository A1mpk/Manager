const Discord = require('discord.js');


module.exports = {
    name: 'lock',
    description: "LOCKS THE CHANNELS",
    execute(message, args){
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'text-channels');
        channels.forEach(channel => {
            channel.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: false
            })
           
        })
        }
    }