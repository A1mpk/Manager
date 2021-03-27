const Discord = require("discord.js")
const AutoRoleSchema = require("../model/AutoRole")
const mongo = require("mongoose")


module.exports =  {
    name: 'autorole_remove',
    description: 'a',
    disabled: false,
  async execute (message, args, client) {
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