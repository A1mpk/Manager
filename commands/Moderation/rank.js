 const Discord = require('discord.js')

module.exports = { 
    name: "rank",
    description: "Shows member's rank.",
    execute(message, args){
        const RankInfo = new Discord.MessageEmbed()
        .setAuthor(message.member.user.tag)
        .addField('User Created', message.member.user.createdAt)
        .addField('User Joined', message.member.joinedAt)
        .setColor(15105570)
        .setFooter(`Command raised by ${message.member.user.tag}`)
        message.channel.send(RankInfo)
    }
}