const Discord = require('discord.js')
const Levels = require('discord-xp');
Levels.setURL("mongodb+srv://admin:LmVUsNQeLiYCsJfr@manager.hd8gy.mongodb.net/<DataBase505>?retryWrites=true&w=majority")
module.exports = { 
    name: "leaderboard",
    description: "Leaderboard",
    disabled: false,
   async execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        if(message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")){
            const LevelsSchema = require("../model/levels")
            const cache = {} 
            let data = cache[message.guild.id]
          
            if (!data) {
              
      
        
           
                try {
                  const result = await LevelsSchema.findOne({guildID: message.guild.id})
                 if(!result)return message.channel.send(`Levelling for this guild has been disabled by default.`)
                  cache[message.guild.id] = data = [result.levels]
                  
                }catch(er){
                  console.log(er)
                }
            }
            if(data[0] === "disable")return message.channel.send(`Levelling system is currently disabled in this guild.`)
            const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id,5 );
           
            if( rawLeaderboard.length < 1)return message.channel.send(`Yet no one is ranked.`)
            
            const leaderboard = Levels.computeLeaderboard(client, rawLeaderboard)
      
            const lb = (await leaderboard).map( e => `**User :** ${e.username}#${e.discriminator}\n **Rank** : ${e.position} \n**Level**: ${e.level}\n**XP** : ${e.xp.toLocaleString()}`);
            const LeaderBord = new MessageEmbed()
            .setTitle(`Leaderboard in ${message.guild.name}`)
            .setDescription(lb.join("\n\n\n"))
            .setTimestamp()
            .setColor("#339295")
            message.channel.send(LeaderBord)
           
            return;
    
          }else message.member.send('I need `SEND_MESSAGE` permissions on the channel or in my role.')
          
    
         
       
    }
}