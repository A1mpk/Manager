const Discord = require('discord.js')
module.exports = {
    name: 'unmute',
    description: "UnMute member",
    execute(message, args){
        const MuteROle = message.guild.roles.cache.find(Role => Role.name === "Muted")
        const UserToMute = message.mentions.users.first();
        const Reason = message.content.slice(30);
        // CHECKING IF MUTE ROLE FOUND WORKS
   
         // Reasons for mute (not needed?) WORKS
         if(message.member.hasPermission(['ADMINISTRATOR','MUTE_MEMBERS'])){
            if(!message.guild.member(UserToMute).roles.cache.get(MuteROle.id)){
                message.channel.send(`That user is already unmuted!`)
               }else
        
         if(!Reason) return message.channel.send(`Reason was not included.`)
         console.log(Reason) 
         // Add the mute command to the G

       
         if(!UserToMute) return message.channel.send(`Make sure to mention someone!`)
         if(Reason){
            message.guild.member(UserToMute).roles.remove(MuteROle)
            message.channel.send(`I have unmuted ${UserToMute.tag} for${Reason}.`)
        }
        }else message.channel.send(`You are not permitted to run this command due to the roles you currently have.`) // WORKS
    }
}