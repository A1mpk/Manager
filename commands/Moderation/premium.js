const Discord = require('discord.js')

module.exports = { 
    name: "premium",
    description: "Gets member count of guild.",
    disabled: true,
   async execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        const YellowData = require('../model/MintyPremium')
       
        if(!message.member.hasPermission("ADMINISTRATOR"))return message.channel.send(`You need to be the Owner or have Administrator permissions in this guild.`)
        const NumberToGuess =  Math.floor(Math.random() * 100)
        const questions = [ 
            `Try to guess the number im thinking of. In return, you get Premium for Minty. A little hint for ya : ${NumberToGuess - 2} `
        ]
        let counter = 0
        console.log(NumberToGuess)
     
        const filter = m => m.author.id === message.author.id
     
        const collector = new Discord.MessageCollector(message.channel, filter, {
            max: questions.length,
            time: 60000 //15s
        })
        message.channel.send(questions[counter++])
        collector.on('collect', m=> {
            if(counter < questions.length) {
                m.channel.send(questions[counter++])
            }
            
        })
        
        collector.on('end',async collected => {
           if(collected.first().content.match(NumberToGuess)){
               const EMBEDWIN = new Discord.MessageEmbed()
               .setTitle(`YOU GUESSED IT🎊🎊`)
               .setDescription(`Congratulations, since you were really lucky enough, you won the Premium version of Minty.*We have added the premium commands in normal Minty.There will not be another bot to invite since it's useless.*`)
               .setColor(`BLUE`)
               .setTimestamp()
               .setThumbnail(`https://cdn.discordapp.com/avatars/834197320983379988/2eca88d8d70febe732db6ca84745bdd9.webp`)
               message.channel.send(EMBEDWIN)

               // PUTTING IT INTO DATABASE!
             
              try{
                  try{
                     
                    await  YellowData.findOneAndUpdate({
                    
                        guildID: message.guild.id,
                       

                    },{
                        MintyPremium: true,
                        guild: message.guild.name,
                        Owner: message.guild.owner.user.tag,
                        messageCreatedAt: message.createdAt,
                        channelID: message.channel.id,
                        by: message.member.id,
                    },{
                        upsert: true
                    })
                  }catch{
  
                  }
              

                    
              }catch{

              }
             const RAEMD = new Discord.MessageEmbed()
             .setTitle(`Premium`)
             .setDescription(`This is very important, if something happens, you will need this as a screenshot.`)
             .addField(`Minty Premium`, true)
             .addField(`Guild`, message.guild.name)
             .addField(`Owner`, message.guild.owner.user.tag)
             .addField(`MessageCreatedAt`, message.createdAt)
             .addField(`ChannelID`, message.channel.id)
             .addField(`By`, message.member.id)
             .setColor("#35979a")
             .setTimestamp()
             .setThumbnail('https://cdn.discordapp.com/avatars/834197320983379988/2eca88d8d70febe732db6ca84745bdd9.webp')

             message.channel.send(RAEMD)
             
           }else message.channel.send(`You didn't guess it right...You still have infinite chances!`)
           
        })
    }
}