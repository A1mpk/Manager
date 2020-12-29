const Discord = require('discord.js');
module.exports = {
    name: 'bot_nick',
    description: "Nicks the message.member.userSetNickname(lol)",
    disabled: false,
    execute(message, args, client){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        const lol = message.content.slice(9)
        const LOL = new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setAuthor('BOT_NICK - MODERATION')
        .setDescription(`Changes the bot's nickname.`)
        .addField('USAGE : `bot_nick <nickname>`', "** **")
        .setTimestamp()
        try{
            if(message.member.hasPermission('ADMINISTRATOR')){
                if(!lol){
                 message.channel.send(LOL)
             }
             if(lol){
                 if(lol.length >32) return message.channel.send(`My nickname has more than 32characters, 32 is the max!`)
                 if(lol.length <32){
                    message.guild.me.setNickname(lol)
                    message.channel.send(`My nickname is now **${lol}**.`)
                 }
             }
            }else message.channel.send('You need `ADMINISTRATOR` to use this command.')
        }catch(er){
            message.channel.send(`Something went wrong, please re-run this command.`)
        }
    
    }

};