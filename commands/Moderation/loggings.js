const Discord = require('discord.js');
const LoggingSchema = require('../model/LoggingSchema');

module.exports = {
    name: 'loggings',
    description: "Logggings",
    disabled: false,
    async execute(message, args){
        if(this.disabled)return message.channel.send(`This is a new command, its still being worked on.`)
       const ANswer = message.content.slice(9)
       if(!message.member.hasPermission("ADMINISTRATOR"))return message.channel.send(`You do not have ADMINISTRATOR mode to use this command.`)
       if(!ANswer){
        const LEvelsNoNo = new Discord.MessageEmbed()
        .setAuthor('LOGGINGS - CONFIG')
            .setDescription('`>loggings <enable/disable>` - This is the loggings command, to enable logging you can simply use this command and it will set the logging to your current channel.')
            .setTimestamp()
        
            .setColor("#35979a")
            message.channel.send(LEvelsNoNo)
       }else
       if(ANswer.toLowerCase().includes("enable".toLowerCase())){
        try {
  
            try {
              await LoggingSchema.findOneAndUpdate(
                {
                  guildID: message.guild.id,
                },
                {
                   
                    channel: message.channel.id,
                    guildID: message.guild.id,
                    guildName: message.guild.name
                  
                },
                {
                  upsert: true,
                }
              )
              message.channel.send(`Logging for this guild is enabled. Bot will now start logging actions in this channel.`)
            }catch(er){
             return message.channel.send(er)
            }
          
        
    }catch(er){
    message.channel.send(er)
    };
    }else if(ANswer.toLowerCase().includes("disable".toLowerCase())){

        try {
  
            try {
              await LoggingSchema.findOneAndDelete(
                {
                  guildID: message.guild.id,
                }
              )
              message.channel.send(`Logging for this guild is disabled.`)
            }catch(er){
             return message.channel.send(er)
            }
          
        
    }catch(er){
    message.channel.send(er)

    }

  }else message.channel.send(`That is not an option.`) 


       
    }

};