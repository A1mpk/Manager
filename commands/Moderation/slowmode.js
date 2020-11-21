const Discord = require('discord.js');

module.exports = {
    name: 'slowmode',
    description: "Slowmode to the channel.",
    execute(message, args){
        const aaa = message.content.split(' ').slice(1); 
        const amount = aaa.join(' ');
        const h69 = new Discord.MessageEmbed()
        .setTitle('SLOWMODE - MODERATION')
            .setDescription('Sets the message cooldown.')
            .addField("USAGE : `slowmode <seconds>`", "** **")
            .setColor(3066993)
            .setTimestamp()
        if (!amount) return message.channel.send(h69) 
        if (isNaN(amount)) return message.channel.send(`That's not a number.`); 
        if (amount > 21600) return message.channel.send(`The maximum input for this command is 21600.`); 
        message.channel.setRateLimitPerUser(amount)
        message.channel.send(`Current cooldown for this channel : ${amount}.`)
    }

};