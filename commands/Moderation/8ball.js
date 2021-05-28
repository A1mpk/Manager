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
        .setColor("BLUE")
        .setAuthor('8BALL - FUN')
        .setDescription('`>8ball <prediction>` - This is just the 8ball command, it will return a yes, no or maybe to your question. Praise the godly 8ball.')
        
        .setTimestamp()
       if(!b){
        message.channel.send(LOL)
       }else
       if(b){
        message.channel.send((res[Math.floor(Math.random() * res.length)]))
       }
        
       }
       
    }
