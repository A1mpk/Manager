const Discord = require('discord.js')

module.exports = { 
    name: "membercount",
    description: "Gets member count of guild.",
    execute(message, args){
        const MemberCount = new Discord.MessageEmbed()
        .setTitle(`Members in ${message.guild.name}`)
        .setDescription(`${message.guild.memberCount}`)
        .setTimestamp()
        .setColor(15105570)
        message.channel.send(MemberCount)
    }
}