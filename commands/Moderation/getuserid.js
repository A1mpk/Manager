const Discord = require('discord.js')
module.exports = { 
    name: "getuserid",
    description: "Gets the id of the user",
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        const idchannel = message.content.slice(10)
       if(!idchannel){
        const LOL = new Discord.MessageEmbed()
        .setColor(3066993)
        .setAuthor('getUSERID - MODERATION')
        .setDescription(`Gets the id of the mentionned user.`)
        .addField('USAGE : `getUSERID <mentionUser>`', "** **")
        .addField(`USER ID`, message.member.user.id)
        .setTimestamp()
           message.channel.send(LOL)
       }else
       if(idchannel){
           const GETIDCHAN =  message.mentions.users.first()
           if(!GETIDCHAN) return message.channel.send(`Cannot find the user '${idchannel}'`)
           message.channel.send(`User ID :${GETIDCHAN.id}`)
       } 
    }
}