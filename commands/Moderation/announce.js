const Discord = require('discord.js');
module.exports = {
    name: 'announce',
    description: "Announces a rule or a normal announcement",
    execute(message, args){
 
        if(message.member.hasPermission("MANAGE_CHANNELS")){
           
            let args = message.content.slice("9")
              const custom_message = new Discord.MessageEmbed()
              .setColor(15158332)
              .setAuthor('Announcement')
              .setDescription(args)
            message.channel.send(custom_message)
            if(message.deletable){
              message.delete()
            }
         } else message.channel.send('You do not have permissions to use this command.')
    }

};