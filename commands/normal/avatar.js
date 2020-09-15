const DIscord = require('discord.js');
module.exports = {
    name: 'avatar',
    description: "Shows the avatar profile pic",
    execute(message, args){
        const user = message.mentions.users.first() || message.author;
                    const avatarEmbed = new DIscord.MessageEmbed()
                        .setColor("RANDOM")
                        .setAuthor(user.username)
                        .setDescription('How you get that good pfp?')
                        .setImage(user.displayAvatarURL())
                    message.channel.send(avatarEmbed);

    }
}
 