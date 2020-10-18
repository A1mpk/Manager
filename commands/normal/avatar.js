const DIscord = require('discord.js');
module.exports = {
    name: 'avatar',
    description: "Shows the avatar profile pic",
    execute(message, args){
        const user = message.mentions.users.first() || message.author;
     
                    const avatarEmbed = new DIscord.MessageEmbed()
                        .setColor(15105570)
                        .setAuthor(user.username)
                        .setDescription(`**AVATAR LINK : ${user.displayAvatarURL()}**`)
                        .setImage(user.displayAvatarURL())
                        .setFooter(`Command raised by ${message.member.user.tag}`)
                    message.channel.send(avatarEmbed);

    }
}
 