const Discord = require('discord.js');
module.exports = {
    name: 'announce',
    description: "Announces a rule or a normal announcement",
    disabled: false,
    execute(message, args){
      if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
     
        if(message.member.hasPermission("MANAGE_CHANNELS")){
         
            let args2 = message.content.slice("9")
            const custom_message = new Discord.MessageEmbed()
            .setColor(3447003)
          
            .setDescription(args2)
            if(!args2){
              const ARGSNEEDED = new Discord.MessageEmbed()
              .setTitle('ANNOUNCE - MODERATION')
              .setDescription('`>announce <announcement>` - This will just post your announcement as an [embed](https://gyazo.com/b91ebad4add6fd5233dfbec22d2170eb).')
            
              .setTimestamp()
              .setColor(3447003)
              message.channel.send(ARGSNEEDED)
            }else
            if(args2){
              message.channel.send(custom_message)
            }
         } else message.channel.send('You do not have the required permission to use this command.')
    }

};
