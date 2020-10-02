const Discord = require('discord.js');
const { link } = require('fs');

module.exports = {
    name: 'support',
    description: 'support of manager ',
    execute(message,args ){
        const Info = new Discord.MessageEmbed()
        .setColor(15105570)
        .setTitle('Support Server ')
        .setDescription('⬆️ Need any help?⬆**Simple!** Just join our support server linked above and we will make sure to help you!👍')
        .setFooter(`Command raised by ${message.member.user.tag}`)
        .setURL('https://discord.gg/GC3Dwkp')
        message.channel.send(Info)
        
    }
}