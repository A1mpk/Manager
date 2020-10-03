const Discord = require('discord.js')
const { link } = require('fs')
const client = new Discord.Client()
module.exports = {
    name: 'info',
    description: 'info of manager',
    execute(message,args ){
        const Info = new Discord.MessageEmbed()
        .setColor(15105570)
        .setTitle('Manager#4176')
        .setDescription('Manager is an upcoming bot actively being developped. This bot will bring you moderation to music, music to currency, currency to fun.')
        .addField('Premium', 'translate,search,auto-moderator,auto-role and posts.')
        .setThumbnail(message.client.user.displayAvatarURL())
        
        message.channel.send(Info)
        
    }
}