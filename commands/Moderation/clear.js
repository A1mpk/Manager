const Discord = require('discord.js');

module.exports = {
    name: 'clear',
    description: "Clear's a amount of message.",
    execute(message, args){
        const ClearHElped = new Discord.MessageEmbed()
        .setTitle('CLEAR - MODERATION')
        .setDescription('Clears the amount of message.')
        .addField("USAGE : `clear <amount>`", "** **")
        .setColor(3066993)
        .setTimestamp()
        const aaa = message.content.split(' ').slice(1); 
        const amount = aaa.join(' ');
        
        if (!amount) return message.channel.send(ClearHElped) 
        if (isNaN(amount)) return message.channel.send(`That's not a number.`); 
        
        if (amount > 100) return message.channel.send(`Please enter an number below **100**.`); 
        if (amount < 1) return message.channel.send(`Really?!?!?`); 
        
        message.channel.messages.fetch({ limit: amount }).then(messages => { 
            message.channel.bulkDelete(messages 
        )});
       
    }

};