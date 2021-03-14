const Discord = require('discord.js');

module.exports = {
    name: 'slowmode',
    description: "Slowmode to the channel.",
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        if(!message.guild.me.hasPermission(['MANAGE_CHANNELS']))return message.channel.send('I don\'t have enough permissions to manage channels. [`MANAGE_CHANNELS`]');
        const aaa = message.content.split(' ').slice(1); 
        const amount = aaa.join(' ');
        const h69 = new Discord.MessageEmbed()
        .setTitle('SLOWMODE - MODERATION')
            .setDescription('`>slowmode <amount>` - This is a slowmode command which sets the message cooldown for this channel.')
          
            .setColor(3447003)
            .setTimestamp()
            if(!message.guild.me.hasPermission(['MANAGE_CHANNELS']))return message.channel.send('I don\'t have enough permissions to manage channels.. [`MANAGE_CHANNELS`]');
            if(!message.guild.me.hasPermission('SEND_MESSAGES'))return;
            if(!message.guild.me.hasPermission('MANAGE_CHANNELS'))return;
            if(!message.guild.me.hasPermission("VIEW_CHANNEL"))return;
            if(message.member.hasPermission(['MANAGE_CHANNELS'])){
                if (!amount) return message.channel.send(h69) 
                if (isNaN(amount)) return message.channel.send(`That's not a number.`); 
                if (amount > 21600) return message.channel.send(`The maximum input for this command is 21600.`); 
                message.channel.setRateLimitPerUser(amount)
                message.channel.send(`Current cooldown for this channel : ${amount}s.`)
            }else message.channel.send('You need `MANAGE_CHANNELS` to use this command')
        
    }

};