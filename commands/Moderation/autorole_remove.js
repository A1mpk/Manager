const Discord = require("discord.js")
const AutoRoleSchema = require("../model/AutoRole")
const mongo = require("mongoose")


module.exports =  {
    name: 'autorole_remove',
    description: 'a',
    disabled: false,
  async execute (message, args, client) {
    const PremiumNeeded = new Discord.MessageEmbed()
    .setTimestamp()
    .setTitle(`Premium😭`)
    .setDescription(`❌ This server does not have Premium. You need Premium to use this command.`)
    .setColor(`BLUE`)
    
     const Premium = require("../model/MintPremium")
     const cache2 = {} 
     let data2 = cache2[message.guild.id]
   
     if (!data2) {
       
   
    
         try {
           const result2 = await Premium.findOne({ guildID: message.guild.id})
          if(!result2)return message.channel.send(PremiumNeeded);

         }catch(er){
           console.log(er)
         }
     };
    
    if(!message.member.hasPermission("ADMINISTRATOR"))return message.channel.send(`You cannot use this command.`)
    
   
   
        try {
  
            try {
              await AutoRoleSchema.findOneAndDelete({
                _id:message.guild.id,
              }
              )
              message.channel.send(`Cleared all roles from autorole.`)
            }catch(er){
             return message.channel.send(`Autorole was not set for this guild.`)
            }
          
        
    }catch(er){
    message.channel.send(er)
    };
   
 
    

    
       
      
    }
};