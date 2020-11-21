const Discord = require('discord.js')
const { link } = require('fs')
const client = new Discord.Client()
module.exports = {
    name: 'info',
    description: 'info of manager',
    execute(message,args ){
        const Info = new Discord.MessageEmbed()
        .setColor(3066993)
        .setTitle( message.guild.me.user.tag)
        .setDescription(`${message.guild.me.user.tag} is an upcoming bot actively being developped. This bot will bring you moderation to music, music to currency, currency to fun.`)
        .addField('Premium', 'translate,search,auto-moderator,auto-role and posts.')
        .addFields(
            { name: 'Version', value: '0.0.3', inline: true },
            { name: `Guilds`, value: message.client.guilds.cache.size, inline: true },
            { name: 'Premium Guilds', value: '0' , inline: true },
        )
        .setThumbnail(message.client.user.displayAvatarURL())
        
        message.channel.send(Info)
        
    }
}