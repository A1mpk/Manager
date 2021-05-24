const Discord = require('discord.js')
module.exports = { 
    name: "getid",
    description: "Gets the id of the channel.",
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        
        const idchannel = message.content.slice(7)
       if(!idchannel){
        const LOL = new Discord.MessageEmbed()
        .setColor("#35979a")
        .setAuthor('getID - MODERATION')
        .setDescription('`>getid <channelName>` - This is a getid command, it returns with the ID of the channel.')
        
        .addField('CHANNEL ID ', message.channel.id)
        .setTimestamp()
           message.channel.send(LOL)
       }else
       if(idchannel){
           const GETIDCHAN = message.guild.channels.cache.find(channel => idchannel === channel.name)
           if(!GETIDCHAN) return message.channel.send(`Cannot find the channel '${idchannel}'.`)
           message.channel.send(`The ID of the selected channel is **${GETIDCHAN.id}**`)
       } 
    }
}