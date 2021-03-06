const Discord = require('discord.js')
module.exports = { 
    name: "guild",
    description: "Basic Information of the guild.",
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        if(!message.guild.me.hasPermission('SEND_MESSAGES'))return;
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS'))return;
        if(!message.guild.me.hasPermission("VIEW_CHANNEL"))return;
        const GuildInfo = new Discord.MessageEmbed()
        .setTitle(message.guild.name)
        .addField('Owner', `<@${message.guild.ownerID}>`)
        .addField('Members', message.guild.memberCount)
        .addField('Created', message.guild.createdAt)
        .addField('Channels', message.guild.channels.cache.size)
        .addField('Roles', message.guild.roles.cache.size)
        .setThumbnail(message.guild.iconURL())
        .setFooter(`Command raised by ${message.member.user.tag}`)
        .setColor(3447003)
        message.channel.send(GuildInfo)
        
    }
}