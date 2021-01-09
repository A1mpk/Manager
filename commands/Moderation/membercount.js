const Discord = require('discord.js')

module.exports = { 
    name: "membercount",
    description: "Gets member count of guild.",
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        if(!message.guild.me.hasPermission('SEND_MESSAGES'))return;
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS'))return;
        if(!message.guild.me.hasPermission("VIEW_CHANNEL"))return;
        const MemberCount = new Discord.MessageEmbed()
        .setTitle(`Members in ${message.guild.name}`)
        .setDescription(`${message.guild.memberCount}`)
        .setTimestamp()
        .setColor("ORANGE")
        message.channel.send(MemberCount)
    }
}