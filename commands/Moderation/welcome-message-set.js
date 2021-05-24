const Discord = require('discord.js');
const WelcomeMessageSchema = require("../model/welcome-message")
module.exports = {
    name: 'welcome-message-set',
    description: "Welcome message when someone joins",
    disabled: false,
    async execute(message, args){
       const ANswer = message.content.slice(20)
       if(!message.member.hasPermission("ADMINISTRATOR"))return message.channel.send(`You do not have ADMINISTRATOR mode to use this command.`)
       if(!ANswer){
        const LEvelsNoNo = new Discord.MessageEmbed()
        .setAuthor('WELCOME-MESSAGE-SET - CONFIG')
            .setDescription('`>welcome-message-set <message>` - This is the welcome message command, it will send a welcome message everytime a user joins the server. (In private messages)')
            .setTimestamp()
        
            .setColor("#35979a")
            message.channel.send(LEvelsNoNo)
       }else
      
        try {
  
            try {
              await WelcomeMessageSchema.findOneAndUpdate(
                {
                  guildID: message.guild.id,
                },
                {
                   
                    guild: message.guild.name,
                    guildID: message.guild.id,
                    guildOwner: message.guild.owner,
                    message: ANswer
                  
                },
                {
            
                  upsert: true,
                }
              )
              message.channel.send(`Your current message is ${ANswer}, if you are unsatisfied, you can always change this by re-using this command.`)
            }catch(er){
             return message.channel.send(er)
            }
          
        
    }catch(er){
    message.channel.send(er)
    };
   

       
    }

};