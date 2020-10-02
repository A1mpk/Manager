const DIscord = require('discord.js');
module.exports = {
    name: 'avatar',
    description: "Shows the avatar profile pic",
    execute(message, args){
        const user = message.mentions.users.first() || message.author;
        var res = [
            "...",
            "They say we dont allow hot things here.",
            "Holy....",
            "Nice pfp",
         ]
                    const avatarEmbed = new DIscord.MessageEmbed()
                        .setColor(15105570)
                        .setAuthor(user.username)
                        .setDescription((res[Math.floor(Math.random() * res.length)]))
                        .setImage(user.displayAvatarURL())
                        .setFooter(`Command raised by ${message.member.user.tag}`)
                    message.channel.send(avatarEmbed);

    }
}
 