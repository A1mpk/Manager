const Discord = require('discord.js');


module.exports = {
    name: 'role_description_add',
    description: ";0",
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
       const RoleName = message.content.slice(20)
       if(RoleName){
        if(isNaN(RoleName))return message.channel.send(`A role ID can only contain numbers.`)
           if(!message.guild.roles.cache.find(Role => RoleName === Role.id))return message.channel.send(`That is not a valid role ID.`)
          
       }
        
    }

    
    }