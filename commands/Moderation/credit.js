const Discord = require('discord.js');
module.exports = {
    name: 'credit',
    description: "Announces a rule or a normal announcement",
    execute(message, args){
 
        if(message.member.hasPermission("MANAGE_CHANNELS")){
           
            let args = message.content.slice("8")
    
            if(!args){
              const ARGSN2EEDED = new Discord.MessageEmbed()
              .setTitle('CREDIT - MODERATION')
              .setDescription('Credits a user.')
              .addField('USAGE : `credit <message>`', "** **")
              .setTimestamp()
              .setColor(15105570)
              message.channel.send(ARGSN2EEDED)
            }

              const custo3m_message = new Discord.MessageEmbed()
              .setColor(15105570)
              .setAuthor('Credits')
              .setDescription(`Credits to ${args}`)
            message.channel.send(custo3m_message)
            if(message.deletable){
              message.delete()
            }
         } else message.channel.send('You do not have permissions to use this command.')
    }

};