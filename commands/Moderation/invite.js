const Discord = require('discord.js');

module.exports = {
    name: 'invite',
    description: "Invite link to bot",
    execute(message, args){
     const InviteEmbed = new Discord.MessageEmbed()
     .setAuthor('INVITE ME')
     .setDescription('https://discord.com/api/oauth2/authorize?client_id=725787532008095744&permissions=8&scope=bot')
     .setColor(3066993)
     .setFooter(`Command raised by ${message.member.user.tag}`)
     message.channel.send(InviteEmbed)
    }

};