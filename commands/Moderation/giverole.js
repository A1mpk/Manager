const Discord = require('discord.js')
module.exports = { 
    name: "giverole",
    description: "Give role comand.",
    execute(message, args){
         // Checking if they sent the role name after the @ WORKS
         if(message.member.hasPermission(['ADMINISTRATOR','MANAGE_ROLES'])){
            const Rolename = message.content.slice(33)
           
            if(!Rolename) return message.channel.send(`Please mention someone and write the name of the role.`)
            // Looking for member WORKS
            const GiveRoleMember = message.mentions.members.first()
            if(!GiveRoleMember) return message.channel.send(`Please mention a user to give the role to.`)
            // Looking for role 
            const GiveRole = message.guild.roles.cache.find(role => Rolename === role.name)
            if(GiveRole){
                message.channel.send(`I have given ${GiveRoleMember.user.tag} the ${Rolename} role!`)
                GiveRoleMember.roles.add(GiveRole)
            }else
            if(!GiveRole){
                message.channel.send(`I cannot find the role ``${Rolename}``.`)
            }
        }else message.channel.send(`You are not permitted to run this command due to the roles you currently have.`)
    }
}