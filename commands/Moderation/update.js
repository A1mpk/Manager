const Discord = require('discord.js');
module.exports = {
    name: 'update',
    description: "Update lol",
    disabled: false,
    execute(message, args){
      if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
      if(!message.guild.me.hasPermission('SEND_MESSAGES'))return;
      if(!message.guild.me.hasPermission('MANAGE_CHANNELS'))return;
      if(!message.guild.me.hasPermission("VIEW_CHANNEL"))return;
        const update = new Discord.MessageEmbed()
        .setTimestamp()
        .setThumbnail(message.guild.me.user.displayAvatarURL())
        .setTitle(`Update 0.4`)
        .setDescription(`__What's new?__`)
        .addField( 'Music Commands','>help for info.')
        .addField(`Canvas Welcome!`, `This is a new feature from Mint! It will send welcome messages as canvas! Soon features : Customizable welcome messsage, Configurable settings for logging.`)
      
        .setFooter(`From Mint Support`)
      message.channel.send(update)
    }

};
