const Discord = require('discord.js');
module.exports = {
    name: 'say',
    description: "Say command.",
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        if(!message.guild.me.hasPermission('SEND_MESSAGES'))return;
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS'))return;
        if(!message.guild.me.hasPermission("VIEW_CHANNEL"))return;
        let args2 = message.content.slice("4")
        const everyone = "@everyone"
        const say = new Discord.MessageEmbed()
        .setAuthor('SAY - FUN')
        .setDescription('Deletes your message and sents the same message as the bots message.')
        .setTimestamp()
        .addField("USAGE : `say <message>`", "** **")
        .setColor("ORANGE")
      if(!args2){
          message.channel.send(say)
      }else
      if(args2){
          message.delete()
          message.channel.send(args2)
      };
     

 
}

};