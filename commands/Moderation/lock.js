const Discord = require('discord.js');


module.exports = {
    name: 'lock',
    description: "LOCKS THE CHANNELS",
    execute(message, args){
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'text-channels');
        const argsfl = message.content.slice("5")
        const lockhelp = new Discord.MessageEmbed()
        .setTitle('LOCK - MODERATION')
        .setDescription('Locks all channels.')
        .addField("USAGE : `lock`", "** **")
        .setColor(3066993)
        .setTimestamp()
        if(message.member.hasPermission('MANAGE_CHANNELS')){
            if(argsfl){
                message.channel.send(lockhelp)
            }
            if(!argsfl){
                channels.forEach(channel => {
                    channel.updateOverwrite(message.guild.roles.everyone, {
                        SEND_MESSAGES: false
                    })
                    
                   
                }) 
                message.channel.send(`Locked ${message.guild.channels.cache.size} channels. {Including VC's}`) 
            }
        }else message.channel.send('You need `MANAGE_CHANNELS` to use this command.')
        
      
    }

    
    }