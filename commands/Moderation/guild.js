const Discord = require('discord.js')
module.exports = { 
    name: "guild",
    description: "Basic Information of the guild.",
    execute(message, args){
        const GuildInfo = new Discord.MessageEmbed()
        .setTitle(message.guild.name)
        .addField('Owner', `<@${message.guild.ownerID}>`)
        .addField('Members', message.guild.memberCount)
        .addField('Created', message.guild.createdAt)
        .addField('Channels', message.guild.channels.cache.size)
        .addField('Roles', message.guild.roles.cache.size)
        .setThumbnail(message.guild.iconURL)
        .setFooter(`Command raised by ${message.member.user.tag}`)
        .setColor(15105570)
        message.channel.send(GuildInfo)
        
    }
}