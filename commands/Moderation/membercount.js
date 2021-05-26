const Discord = require('discord.js')

module.exports = { 
    name: "membercount",
    description: "Gets member count of guild.",
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
    
        const MemberCount = new Discord.MessageEmbed()
        .setTitle(`Members in ${message.guild.name}`)
        .setDescription(`${message.guild.memberCount}`)
        .setTimestamp()
        .setColor("#c45c4e")
        message.channel.send(MemberCount)
    }
}