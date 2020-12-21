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
        .addField(`Suggestion`, 'This command is a suggestion one! Want to suggest something for the server? Well now you can!')
        .addField('Mute', 'This command will mute the user permanently!')
        .addField('Unmute', 'This command will unmute the user.')
        .addField(`Slowmode`, 'This command sets the slowmode for a channel.')
        .addField(`Clear`,'This commands deletes messages up to 100!')
        .addField(`Giverole`, 'This command lets you give a role to a member. **Usage : >giverole <@> <rolename>**')
        .addField(`Karen`, 'This command is a fun command! Try to compete against Karen. All answers are right just go all out on her.')
        .setColor("RED")
        .addField("NEW LISTENERS :", '** **')
        .addField('Guild Create', 'This will send to a channel when the bot gets invited to it (basic help command)')
        .addField('GuildMemberRemove', 'This will log it when a user gets kicked/banned/leaves')
        .addField('GuildMemberAdd', 'This will also log when a user joins the guild')
        .addField('messageDelete', 'This will also also log when a message gets deleted')
        .addField('InviteCreate/InviteDelete',' This will also also also log when a user creates/deletes invite.')
        .addField('EmojiCreate/Delete', 'This will also also also also log when a user creates/deletes an emoji.')
        .addField('RoleDelete', 'This will also also also also also log when a user deletes a role.')
        .setFooter(`From Mint Support`)
      message.channel.send(update)
    }

};
