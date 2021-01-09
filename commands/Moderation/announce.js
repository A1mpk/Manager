const Discord = require('discord.js');
module.exports = {
    name: 'announce',
    description: "Announces a rule or a normal announcement",
    disabled: false,
    execute(message, args){
      if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
      if(!message.guild.me.hasPermission('SEND_MESSAGES'))return;
      if(!message.guild.me.hasPermission('MANAGE_CHANNELS'))return;
      if(!message.guild.me.hasPermission("VIEW_CHANNEL"))return;
        if(message.member.hasPermission("MANAGE_CHANNELS")){
         
            let args2 = message.content.slice("9")
            const custom_message = new Discord.MessageEmbed()
            .setColor("ORANGE")
            .setAuthor('Announcement')
            .setDescription(args2)
            if(!args2){
              const ARGSNEEDED = new Discord.MessageEmbed()
              .setTitle('ANNOUNCE - MODERATION')
              .setDescription('Announces a important message.')
              .addField('USAGE : `announce <message>`', "** **")
              .setTimestamp()
              .setColor("ORANGE")
              message.channel.send(ARGSNEEDED)
            }else
            if(args2){
              message.channel.send(custom_message)
            }
         } else message.channel.send('You do not have permissions to use this command.')
    }

};
