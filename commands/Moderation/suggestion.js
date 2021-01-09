
const Discord = require('discord.js')
module.exports = {
    name: "suggestion",
    description: "Suggeston command version 1",
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        if(!message.guild.me.hasPermission('SEND_MESSAGES'))return;
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS'))return;
        if(!message.guild.me.hasPermission("VIEW_CHANNEL"))return;
        const questions = [ 
            'Set a tittle for your suggestion!',
            'What is your suggestion?'
        ]
        let counter = 0
        
     
        const filter = m => m.author.id === message.author.id
     
        const collector = new Discord.MessageCollector(message.channel, filter, {
            max: questions.length,
            time: 60000 //15s
        })
        message.channel.send(questions[counter++])
        collector.on('collect', m=> {
            if(counter < questions.length) {
                m.channel.send(questions[counter++])
            }
            
        })
        
        collector.on('end', collected => {
            const Embed = new Discord.MessageEmbed()
            .setTitle(collected.first())
            .addField('What is your suggestion?', collected.last())
           .setColor("RED")
           .setThumbnail(message.author.displayAvatarURL())
           .setTimestamp()
           .setFooter(`By ${message.member.user.tag}`)
           const Channel = message.guild.channels.cache.find(chan => chan.name === "suggestions")
           if(!Channel) return message.guild.channels.create("suggestions")
           Channel.send(Embed)
        })
    }
}