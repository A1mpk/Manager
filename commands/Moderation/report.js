const Discord = require('discord.js')
const client = new Discord.Client();
module.exports = { 
    name: "report",
    description: "j",
    execute(message, args){
        report = message.content.slice("7")
       const Report = new Discord.MessageEmbed()
       .setAuthor(`Report by ${message.member.user.tag}`)
       .setDescription(`${report}`)
       .setColor(15105570)
       .setFooter(`Command raised by ${message.member.user.tag}`)
        if (!report) {
            const repportt = new Discord.MessageEmbed()
           .setDescription("Sends a report to the owner of the guild.")
           .addField("USAGE : `report <problem>`", '** **')
           .addField('Command Cooldown', '48 hours')
           .setColor(15105570)
           .setTitle('REPORT - UTILITIES')
           message.channel.send(repportt)
        }
        if (report) {
           message.channel.send('Thank you for reporting your issue.')
           message.guild.owner.send(Report)
        }
    }
}