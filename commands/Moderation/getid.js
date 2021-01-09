const Discord = require('discord.js')
module.exports = { 
    name: "getid",
    description: "Gets the id of the channel.",
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        if(!message.guild.me.hasPermission('SEND_MESSAGES'))return;
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS'))return;
        if(!message.guild.me.hasPermission("VIEW_CHANNEL"))return;
        const idchannel = message.content.slice(7)
       if(!idchannel){
        const LOL = new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setAuthor('getID - MODERATION')
        .setDescription(`Gets the id of the mentionned channel.`)
        .addField('USAGE : `getID <channelName>`', "** **")
        .addField('CHANNEL ID ', message.channel.id)
        .setTimestamp()
           message.channel.send(LOL)
       }else
       if(idchannel){
           const GETIDCHAN = message.guild.channels.cache.find(channel => idchannel === channel.name)
           if(!GETIDCHAN) return message.channel.send(`Cannot find the channel '${idchannel}'.`)
           message.channel.send(` Channel ID : ${GETIDCHAN.id}`)
       } 
    }
}