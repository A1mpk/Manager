const Discord = require('discord.js');
const client =  new Discord.Client()
module.exports = {
    name: 'update',
    description: "Update lol",
    execute(message, args,client){
 
        const update = new Discord.MessageEmbed()
        .setTimestamp()
        .setThumbnail(message.guild.me.user.displayAvatarURL())
        .setTitle(`Update 0.4`)
        .setDescription(`__Whats new?__`)
        .addField(`Suggestion`, 'This command is a suggestion one! Want to suggest something for the server? Well now you can!')
        .addField('Mute', 'This command will mute the user permanently!')
        .addField('Unmute', 'This command will unmute the user.')
        .addField(`Slowmode`, 'This command sets the slowmode for a channel.')
        .addField(`Clear`,'This commands deletes messages up to 100!')
        .addField(`Giverole`, 'This command lets you give a role to a member. **Usage : >giverole <@> <rolename>**')
        .addField(`Karen`, 'This command is a fun command! Try to compete against Karen. All answers are right just go all out on her.')
        .setColor("RED")
        .setFooter(`From Mint Support`)
      message.channel.send(update)
    }

};
