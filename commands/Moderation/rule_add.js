const Discord = require('discord.js')
const guild = require('./guild')

module.exports = { 
    name: "rule_add",
    description: "Shows member's rank.",
    disabled: false,
    execute(message, args){
      if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        if(message.member.hasPermission("MANAGE_CHANNELS")){
           
            let args3 = message.content.slice(10)
    
            if(!args3){
              const ARGSNEEDED2 = new Discord.MessageEmbed()
              .setTitle('RULE_ADD - MODERATION')
              .setDescription('Announces a important message.')
              .addField('USAGE : `rule_add <rules>`', "** **")
              .setTimestamp()
              .setColor("ORANGE")
              message.channel.send(ARGSNEEDED2)
            }

              const custom4_message = new Discord.MessageEmbed()
              .setColor("ORANGE")
              .setAuthor('Rules')
              .setDescription(`Welcome to **${message.guild.name}**, and here are the rules you should follow : 
              ${args3}`)
              if(args3){
                message.channel.send(custom4_message)
              }
          
         
         } else message.channel.send('You do not have permissions to use this command.')
    }
}