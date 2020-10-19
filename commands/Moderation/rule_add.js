const Discord = require('discord.js')

module.exports = { 
    name: "rule_add",
    description: "Shows member's rank.",
    execute(message, args){
        if(message.member.hasPermission("MANAGE_CHANNELS")){
           
            let args3 = message.content.slice("9")
    
            if(!args3){
              const ARGSNEEDED2 = new Discord.MessageEmbed()
              .setTitle('RULE_ADD - MODERATION')
              .setDescription('Announces a important message.')
              .addField('USAGE : `rule_add <rules>`', "** **")
              .setTimestamp()
              .setColor(15105570)
              message.channel.send(ARGSNEEDED2)
            }

              const custom4_message = new Discord.MessageEmbed()
              .setColor(15105570)
              .setAuthor('Rules')
              .setDescription(args)
              if(args3){
                message.channel.send(custom4_message)
              }
          
         
         } else message.channel.send('You do not have permissions to use this command.')
    }
}