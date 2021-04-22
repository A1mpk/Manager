   
   
   const Discord = require('discord.js')
   const client = new Discord.Client();
   module.exports  = { 
       name: "role_description_add",
       description: "Roles desctiption",
       disabled: false,
        async execute(message, args){
           if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)

           // CHECKING PREMIUM
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
           

          
  // CHECKING FOR PERMISSIONS
  if(!message.guild.me.hasPermission("MANAGE_CHANNELS"))return message.channel.send(`I need MANAGE_CHANNELS to use this command.`)
  if(!message.member.hasPermission("MANAGE_CHANNELS"))return message.channel.send(`You need MANAGE_CHANNELS to use this command.`)

  // CHECKING FOR STUFF LIKE ARGUMENTS, ROLE MENTIONS & ROLES-DESCRIPTION.
  const Arguments = message.content.slice(`45`)
  if(!Arguments)return message.channel.send(`You need to include which role and the description for that role.`)

 
 const RoleIdentify = message.mentions.roles.first()
 if(!RoleIdentify)return message.channel.send(`You need to mention a role first.`)
 const Role = message.guild.roles.cache.find(role => RoleIdentify === role)
 if(!Role){
   message.channel.send(`There isn't any roles with that ID.`)
 }

 const FileOf = require("../model/RoleSchema")


 try {
 
   try {
     await FileOf.findOneAndUpdate(
       {
         roleName: Role.id
       },
       {
         roleName: Role.id,
         desctiption: Arguments
         
       },
       {
         upsert: true,
       }
     )

     const TestedEmbed = new Discord.MessageEmbed()
     .setTitle(`${Role.name} || DESCRIPTION`)
     .setDescription(Arguments)
     .setColor("BLUE")
     .setTimestamp()
     
     message.channel.send(TestedEmbed)
   }catch(er){
    return message.channel.send(er)
   }
 

}catch(er){
message.channel.send(er)
};


            
            


       }
   }
   
