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
        .setDescription('`>say <message>` - This is a say command, it repeats your message.')
        .setTimestamp()
    
        .setColor(3447003)
      if(!args2){
          message.channel.send(say)
      }else
      if(args2){
          if(args2.match('@everyone'))return message.channel.send(`Message cannot contain @.everyone.`);
          message.delete()
          message.channel.send(args2)
      };
     

 
}

};