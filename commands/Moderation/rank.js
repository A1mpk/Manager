 const Discord = require('discord.js')

module.exports = { 
    name: "rank",
    description: "Shows member's rank.",
    execute(message, args){
        const RankInfo = new Discord.MessageEmbed()
        .setAuthor(message.member.user.tag)
        .addField('User Created', message.member.user.createdAt)
        .addField('User Joined', message.member.joinedAt)
        .setColor(16580705)
        message.channel.send(RankInfo)
    }
}