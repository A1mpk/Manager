const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: "LIST OF COMMANDS",
    execute(message, args){
        const HelpEmbed = new Discord.MessageEmbed()
        .setAuthor('Moderation Commands')
        .setColor(15158332)
        .addField('ban', "Used to ban a member.")
        .addField('kick', "The command will kick a user.")
        .addField('avatar','Shows the avatar of the mentionned person or themself.')
        .addField('announce','Use to announce things you want to.')
        .addField('lock','Locks all the channels when a raid is about to occure.')
        if(message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(HelpEmbed)
        const PermEm = new Discord.MessageEmbed()
        .setAuthor('PERMISSION ERRORS')
        .setDescription('**USER NEEDS PERMISSIONS TO USE THIS COMMAND!**')
        .setColor(15158332)
        return message.channel.send(PermEm)
    }

};