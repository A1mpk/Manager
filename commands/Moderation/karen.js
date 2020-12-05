const Discord = require('discord.js')
module.exports = {
    name: "karen",
    description: "Karen command ofc",
    execute(message,args){
        let karenquestions = [
            "Can I speak to the Manager?",
            "WOAH YOUNG HUMAN!What do you think you are doing?",
            "Do you really wanna test me?",
            "Do you support Karen's life matter?",
            "Can I know why was my raw chicken not cooked?",
            
        ]
        let counter = 0
          
       
          const filter = m => m.author.id === message.author.id
       
          const collector = new Discord.MessageCollector(message.channel, filter, {
              max: karenquestions.length,
              time: 60000 //15s
          })
          message.channel.send(karenquestions[counter++])
          collector.on('collect', m=> {
              if(counter < karenquestions.length) {
                  m.channel.send(karenquestions[counter++])
              }
              
          })
          collector.on('end', collected => {
              let counter = 0;
             message.channel.send(`The game ended, you lost. Karen won!`)
              collected.forEach(value => {
                  value.channel.send(`Question :${karenquestions[counter++]} Your answer : ${value.content}`)
              })
          })
    }
}