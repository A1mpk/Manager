const Discord = require('discord.js')
const client = new Discord.Client();
module.exports = { 
    name: "report",
    description: "j",
    disabled: false,
   async execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
  // FINDING THE REPORT CHANNEL AND IF WE DIDNT WE SAY NO.
  const ReportData = require('../model/ReportData')
  const cache = {} 
  let data = cache[message.guild.id]

  if (!data) {
    

 
    
        const result = await ReportData.findOne({guildID: message.guild.id})
       if(!result)return message.channel.send(`The report channel was either deleted or I don't have access to it.`)
        cache[message.guild.id] = data = [result.reportChannel]
        
     
  }
           //CHECKING IF THE USER SENT AN ACTUAL REPORT OR NO
           const questions = [ 
            'Who are you reporting? Ex: `user` or `server`?',
            'What is your report?'
        ]
        let counter = 0
        
     
        const filter = m => m.author.id === message.author.id
     
        const collector = new Discord.MessageCollector(message.channel, filter, {
            max: questions.length,
            time: 60000 //15s
        })
        const ReportEmbed = new Discord.MessageEmbed()
        .setTitle(`Report`)
        .setDescription(questions[counter++])
        .setTimestamp()
        .setColor("#c45c4e")

    
       
        message.channel.send(ReportEmbed)
        collector.on('collect', m=> {
            if(counter < questions.length) {
                m.channel.send(questions[counter++])
            }
          

          
            
        })
         
           
    
     

        //PART WHERE IT SENDS IT TO THE REPORT CHNANEL

        collector.on('end',async collected => {
             
           
            message.channel.send(`Your report has been sent to the Admins. Expect a reply soon but do not forget to keep your dms on so Admins can talk to you privatly.`)
            let counter = 0
            const ReportChannel = message.guild.channels.cache.find(chan => data[0] === chan.id)
            const ReportChannelEmbed = new Discord.MessageEmbed()
            .setAuthor(`Report by ${message.member.user.tag}`, message.member.user.displayAvatarURL())
            .addField(questions[counter++], collected.first().content)
            .addField(questions[counter++], collected.last().content)
            .setDescription(`To take care of this case, you must DM the user or talk to them on a private channel. To trash a report, you could react with ❌.`)
             
             .setTimestamp()
             .setColor("#c45c4e")
            const ReportChannelEmbed2 = await ReportChannel.send(`A new report :`, ReportChannelEmbed )
          
        
         ReportChannel.send(ReportChannelEmbed2)
        
         await   ReportChannelEmbed2.react('❌')
         // LISTENING FOR REAFTIONS
         const reactionFilter = (reaction, user) => [ '❌'].includes(reaction.emoji.name) 
         const collector2 = ReportChannelEmbed2.createReactionCollector(reactionFilter);
     
         collector2.on('collect', (reaction, user) => {
         if(reaction.emoji.name === '❌'){
               
               ReportChannelEmbed2.delete({timeout: 5000})
             }
         })
         
      
          
        })
    
    }
}