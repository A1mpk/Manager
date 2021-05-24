const Discord = require('discord.js');

module.exports = {
    name: 'clear',
    description: "Clear's a amount of message.",
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        const ClearHElped = new Discord.MessageEmbed()
        .setTitle('CLEAR - MODERATION')
        .setDescription('`>clear <amount>` - This is just a clear command, it clears the amount of messages asked for.')
       
        .setColor("#35979a")
        .setTimestamp()
        const aaa = message.content.split(' ').slice(1); 
        const amount = aaa.join(' ');
      
            if(message.member.hasPermission('MANAGE_MESSAGES')){
                if (!amount) return message.channel.send(ClearHElped) 
                if (isNaN(amount)) return message.channel.send(`That's not a number.`); 
                
                if (amount > 100) return message.channel.send(`Please enter an number below **100**.`); 
                if (amount < 2) return message.channel.send(`Really..?`)
                else
                
                message.channel.messages.fetch({ limit: amount }).then(messages => { 
                    message.channel.bulkDelete(messages 
                )})
                message.channel.send(`I have cleared **${amount}** messages!`).then(m => m.delete({timeout: 5000}))
            }else message.channel.send('You need `MANAGE_MESSAGES` to use this command.')
            
      
       
       
    }

};