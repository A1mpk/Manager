const Discord = require('discord.js')

module.exports = {
    name: '8ball',
  description: 'Help command.',
  disabled: false,
 execute(message, args){
  if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
    let res = [
      "Yes.",
      "No.",
      "Maybe."
    ]
      const b = message.content.slice(6)
        const LOL = new Discord.MessageEmbed()
        .setColor(3066993)
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
