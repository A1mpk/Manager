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
       .setColor(16580705)
        if (!report) {
            message.channel.send('Enter a report.') 
        }
        if (report) {
           message.channel.send(Report)
           
        }
    }
}