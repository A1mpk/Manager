   
   
   const Discord = require('discord.js')

   module.exports  = { 
       name: "role_description_remove",
       description: "Roles desctiption",
       disabled: false,
        async execute(message, args){
       
           
            const RoleSchema = require("../model/RoleSchema")
           if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
           const RoleIdentify = message.mentions.roles.first()
           if(!RoleIdentify)return message.channel.send(`You need to mention a role to know their description.`)
          
   
         // FETCHING DATA
         try{
           
            await RoleSchema.findOneAndDelete({
             roleName: RoleIdentify.id,
           }
           )
         }catch{
             message.channel.send(`That role never had a description.`)
         }
         
           

          
         message.channel.send(`Deleted the description of that role.`)
  

       }
   }
   
