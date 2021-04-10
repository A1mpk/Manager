const Discord = require("discord.js")
const WelcomeMessageSchema = require("../model/welcome-message")
const mongo = require("mongoose")


module.exports =  {
    name: 'welcome-message-remove',
    description: 'a',
    disabled: false,
  async execute (message, args, client) {
    if(!message.member.hasPermission("ADMINISTRATOR"))return message.channel.send(`You cannot use this command.`)
    
   
   
        try {
  
            try {
              await WelcomeMessageSchema.findOneAndDelete({
                guildID: message.guild.id,
              }
              )
              message.channel.send(`Cleared welcome message.`)
            }catch(er){
             return message.channel.send(`Welcome message was not set for this guild.`)
            }
          
        
    }catch(er){
    message.channel.send(er)
    };
   
 
    

    
       
      
    }
};