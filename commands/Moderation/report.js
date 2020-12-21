const Discord = require('discord.js')
const client = new Discord.Client();
module.exports = { 
    name: "report",
    description: "j",
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        report = message.content.slice("7")
       const Report = new Discord.MessageEmbed()
       .setAuthor(`Report by ${message.member.user.tag}`)
       .setDescription(`${report}`)
       .setColor(3066993)
       .setFooter(`Command raised by ${message.member.user.tag}`)
        if (!report) {
            const repportt = new Discord.MessageEmbed()
           .setDescription("Sends a report to the owner of the guild.")
           .addField("USAGE : `report <problem>`", '** **')
           .setColor(3066993)
           .setTitle('REPORT - UTILITIES')
           message.channel.send(repportt)
        }
        if (report) {
           message.channel.send('Thank you for reporting your issue.')
           message.guild.owner.send(Report)
        }
    }
}