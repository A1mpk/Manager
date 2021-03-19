const Discord = require("discord.js")
const AutoRoleSchema = require("../model/AutoRole")
const mongo = require("mongoose")


module.exports =  {
    name: 'autorole_add',
    description: 'a',
    disabled: false,
  async execute (message, args, client) {
    if(!message.member.hasPermission("MANAGE_ROLES"))return message.channel.send(`You cannot use this command.`)
      const ROLEID = message.content.slice(14)
      if(!ROLEID){
        const LOL = new Discord.MessageEmbed()
        .setColor(3447003)
        .setAuthor('AUTOROLE_ADD - LOGGING')
        .setDescription('`>autorole_add <roleID>` - This is just the autorole command, everytime a user joins it gives them that role.')
        .addField("Sub Commands", '`autorole_remove` - This is a upcoming command.[Edited at 3/14/21]')
        
        .setTimestamp()
        message.channel.send(LOL)
      }
      
      if(ROLEID){
        if(isNaN(ROLEID))return message.channel.send(`A role ID contains only number.`)
        const ROLEFIND = message.guild.roles.cache.find(role => ROLEID === role.id)
        if(!ROLEFIND)return message.channel.send("I couldn't find a role with that ID!")
        else

   
   
        try {
  
            try {
              await AutoRoleSchema.findOneAndUpdate(
                {
                  _id: message.guild.id,
                },
                {
                  _id: message.guild.id,
                  guildName: message.guild.name,
                  autorole: ROLEID
                },
                {
                  upsert: true,
                }
              )
              message.channel.send(`Succesfully set autorole for the role "${ROLEFIND}"`)
            }catch(er){
             return message.channel.send(er)
            }
          
        
    }catch(er){
    message.channel.send(er)
    };
   
 
    

    
       
      }
    }
};