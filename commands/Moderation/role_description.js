   
   
   const Discord = require('discord.js')

   module.exports  = { 
       name: "role_description",
       description: "Roles desctiption",
       disabled: false,
        async execute(message, args){
           if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
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
           
           const RoleIdentify = message.mentions.roles.first()
           if(!RoleIdentify)return message.channel.send(`You need to mention a role to know their description.`)
         // FETCHING DATA
           const RoleSchema = require("../model/RoleSchema")
           const CacheofRoles = {} 
           let Data = CacheofRoles[RoleIdentify]
         
           if (!Data) {
             
         
          
                 const Result = await RoleSchema.findOne({roleName: RoleIdentify.id})
                if(!Result)return message.channel.send(`That role has no description.`);
                 CacheofRoles[RoleIdentify] = Data = [Result.roleName, Result.desctiption]
         }
         // ACTUAL COMMAND
         const ConvertingRoleIntoName = message.guild.roles.cache.find(rl => Data[0] === rl.id)
         const TestedEmbed = new Discord.MessageEmbed()
         .setTitle(`${ConvertingRoleIntoName.name} || DESCRIPTION`)
         .setDescription(Data[1])
         .setColor("BLUE")
         .setTimestamp()
         
         message.channel.send(TestedEmbed)
  

       }
   }
   
