const DIscord = require('discord.js');
module.exports = {
    name: 'avatar',
    description: "Shows the avatar profile pic",
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
     
        const user = message.mentions.users.first() || message.author;
     
                    const avatarEmbed = new DIscord.MessageEmbed()
                        .setColor("#339295")
                        .setAuthor(user.username)
                        .setDescription(`**AVATAR LINK : ${user.displayAvatarURL()}**`)
                        .setImage(user.displayAvatarURL())
                        .setFooter(`Command raised by ${message.member.user.tag}`)
                    message.channel.send(avatarEmbed);

    }
}
 