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
                        .setColor("RANDOM")
                        .setAuthor(user.username)
                        .setDescription((res[Math.floor(Math.random() * res.length)]))
                        .setImage(user.displayAvatarURL())
                    message.channel.send(avatarEmbed);

    }
}
 