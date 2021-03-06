const DIscord = require('discord.js');
module.exports = {
    name: 'avatar',
    description: "Shows the avatar profile pic",
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        if(!message.guild.me.hasPermission('SEND_MESSAGES'))return;
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS'))return;
        if(!message.guild.me.hasPermission("VIEW_CHANNEL"))return;
        const user = message.mentions.users.first() || message.author;
     
                    const avatarEmbed = new DIscord.MessageEmbed()
                        .setColor(3447003)
                        .setAuthor(user.username)
                        .setDescription(`**AVATAR LINK : ${user.displayAvatarURL()}**`)
                        .setImage(user.displayAvatarURL())
                        .setFooter(`Command raised by ${message.member.user.tag}`)
                    message.channel.send(avatarEmbed);

    }
}
 