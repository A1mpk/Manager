const Discord = require('discord.js')

module.exports = {
    name: '8ball',
  description: 'Help command.',
  disabled: false,
 execute(message, args){
  if(!message.guild.me.hasPermission('SEND_MESSAGES'))return;
    if(!message.guild.me.hasPermission('MANAGE_CHANNELS'))return;
    if(!message.guild.me.hasPermission("VIEW_CHANNEL"))return;
  if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
    let res = [
      "Yes.",
      "No.",
      "Maybe.",
      "Are you crazy? Of course!"
    ]
      const b = message.content.slice(6)
        const LOL = new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setAuthor('8ball - FUN')
        .setDescription(`8ball is a command that replies with Yes, No, Maybe`)
        .addField('USAGE : `8ball <message>`', "** **")
        .setTimestamp()
       if(!b){
        message.channel.send(LOL)
       }else
       if(b){
        message.channel.send((res[Math.floor(Math.random() * res.length)]))
       }
        
       }
       
    }
