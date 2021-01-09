const Discord = require('discord.js');


module.exports = {
    name: 'lock',
    description: "LOCKS THE CHANNELS",
    disabled: true,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        if(!message.guild.me.hasPermission('SEND_MESSAGES'))return;
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS'))return;
        if(!message.guild.me.hasPermission("VIEW_CHANNEL"))return;
        
    }

    
    }