const Discord = require('discord.js')
const client = new Discord.Client();
module.exports = { 
    name: "report",
    description: "j",
    execute(message, args){
   const OWNEr = client.users.cache.find(users => users.id === "368148684468387840")
        report = message.content.slice("7")
       const Report = new Discord.MessageEmbed()
       .setAuthor(`Report by ${message.member.user.tag}`)
       .setDescription(`${report}`)
       .setColor(15105570)
       .setFooter(`Command raised by ${message.member.user.tag}`)
        if (!report) {
            const repportt = new Discord.MessageEmbed()
           .setDescription("Sends a report to the owner of the bot.")
           .addField("USAGE : `report <problem>`", '** **')
           .setColor(15105570)
           .setTitle('REPORT - UTILITIES')
           message.channel.send(repportt)
        }
        if (report) {
           message.channel.send(Report)
           
        }
    }
}