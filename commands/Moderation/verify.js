const Discord = require('discord.js')
const guild = require('./guild')

module.exports = {
    name: 'verify',
    description: "Verify system",
    disabled: false,
    execute(message, args){  
      if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        const Role = message.guild.roles.cache.find(r => r.name === 'Verified');
        const VerifySetup3 = new Discord.MessageEmbed()
        .setTitle(`Successfully verified ✔️`)
        .setDescription(`Congratulations, you have been verified.`) 
        .setFooter(`${message.guild.name} || Verify`)
        .setThumbnail(message.member.user.displayAvatarURL())
        .setTimestamp()
        .setColor(3066993)
        if(!Role){
          message.guild.roles.create({
                data: {
                  name: 'Verified',
                  color: 'GREEN',
                  permissions: ['SEND_MESSAGES', 'ADD_REACTIONS', 'SPEAK', 'SEND_TTS_MESSAGES', 'STREAM', 'CONNECT', 'USE_EXTERNAL_EMOJIS', 'READ_MESSAGE_HISTORY'],
                  
                },
                reason: 'Verify system, DO NOT CHANGE THE NAME OF THIS ROLE.',
              })
                .then(console.log())
                .catch(console.error);
               message.channel.send(`Something went wrong, please run the command again.`)
        }
        if(Role){
            const guildchannel = message.guild.channels.cache.find(ch=> ch.name === "log-test")
       if(!guildchannel)return message.guild.owner.send(`Hello, I cannot find a channel named "log-test" in your guild ${message.guild.name}, please create one.`)
       const VerifySetup = new Discord.MessageEmbed()
       .setTitle(`Member Verified ✔️`)
       .setDescription(`${message.member} has been verified`) 
       .setFooter(`${message.guild.name} || Verify`)
       .setThumbnail(message.member.user.displayAvatarURL())
       .setTimestamp()
       .setColor(3066993)
       guildchannel.send(VerifySetup)
            message.react('✔️')
            message.member.roles.add(Role)
            message.author.send(VerifySetup3)
            
        }
    }
}