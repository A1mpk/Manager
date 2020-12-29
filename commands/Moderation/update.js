const Discord = require('discord.js');
module.exports = {
    name: 'update',
    description: "Update lol",
    disabled: false,
    execute(message, args){
      if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        const update = new Discord.MessageEmbed()
        .setTimestamp()
        .setThumbnail(message.guild.me.user.displayAvatarURL())
        .setTitle(`Update 0.4`)
        .setDescription(`__What's new?__`)
        .addField( 'Music Commands','>help for info.')
        .setFooter(`From Mint Support`)
      message.channel.send(update)
    }

};
