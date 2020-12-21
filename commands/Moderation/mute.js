const Discord = require('discord.js')
module.exports = {
    name: 'mute',
    description: "Mute member",
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'text-channels');
        // CHECKING IF MUTE ROLE FOUND WORKS
        if(message.member.hasPermission(['ADMINISTRATOR','MUTE_MEMBERS'])){
         const MuteROle = message.guild.roles.cache.find(Role => Role.name === "Muted")
         if(!MuteROle){
             message.guild.roles.create({
                 data: {
                   name: 'Muted',
                   color: 'NONE',
                   permissions: ['VIEW_CHANNEL']
                 },
                 reason: 'Automatic Mute Role!',
               })
                 .then(console.log())
                 .catch(console.error);
                message.channel.send(`Something went wrong, please run the command again.`)
         }
         // Reasons for mute (not needed?) WORKS
         const Reason = message.content.slice(28);
         if(!Reason) return message.channel.send(`Reason was not included.`)
         console.log(Reason) 
         // Add the mute command to the G
         const UserToMute = message.mentions.users.first();
         if(message.guild.member(UserToMute).roles.cache.get(MuteROle.id)){
            message.channel.send(`That user is already muted!`)
           }else
         if(message.guild.member(UserToMute).hasPermission(['MUTE_MEMBERS', 'ADMINISTRATOR'])){
             message.channel.send(`Failure to mute the mentionned user due to them being a mod.`)
         }else
         if(!message.guild.member(UserToMute).hasPermission(['ADMINISTRATOR', 'MUTE_MEMBERS'])){
             message.guild.member(UserToMute).roles.add(MuteROle)
             channels.forEach(channel => {
                 channel.updateOverwrite(MuteROle, {
                     SEND_MESSAGES: false
                 })
             })
             message.channel.send(`I have muted ${UserToMute.tag} for ${Reason}.`)
         }
       
        }else message.channel.send(`You are not permitted to run this command due to the roles you currently have.`) // WORKS
    }
}