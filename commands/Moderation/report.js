const Discord = require('discord.js')
const client = new Discord.Client();
module.exports = { 
    name: "report",
    description: "j",
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        if(!message.guild.me.hasPermission('SEND_MESSAGES'))return;
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS'))return;
        if(!message.guild.me.hasPermission("VIEW_CHANNEL"))return;
        try{
            report = message.content.slice("7")
            const Report = new Discord.MessageEmbed()
            .setAuthor(`Report by ${message.member.user.tag}`)
            .setDescription(`${report}`)
            .setColor("ORANGE")
            .setFooter(`Command raised by ${message.member.user.tag}`)
             if (!report) {
                 const repportt = new Discord.MessageEmbed()
                .setDescription("Sends a report to the owner of the guild.")
                .addField("USAGE : `report <problem>`", '** **')
                .setColor("ORANGE")
                .setTitle('REPORT - UTILITIES')
                message.channel.send(repportt)
             }
             if (report) {
                message.channel.send('Thank you for reporting your issue.')
                message.guild.owner.send(Report)
             }
    }catch(er){
      message.channel.send(`The owner of this guild has turned their DM's off which makes it that I cannot text them.`)    
    }
    }
}