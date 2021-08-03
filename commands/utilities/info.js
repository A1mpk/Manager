const Discord = require('discord.js');
module.exports = {
    name: 'info',
    description: "INfo",
    disabled: false,
    execute(message, args, client){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        const Info = new Discord.MessageEmbed()
        .setColor("#339295")
        .setAuthor("Mint ", message.guild.me.user.displayAvatarURL())
        .setDescription(
          `Mint is an upcoming bot actively being developped. This bot will bring you moderation to music, logging to fun.`
        )
        .setFooter(`Thank you for using Mint.`)
        .addFields(
          { name: "🎀Version", value: "2.0.0", inline: true },
          {
            name: `Ⓜ️Guilds`,
            value: message.client.guilds.cache.size,
            inline: true,
          },
          {
            name: "🧑Users",
            value: message.client.users.cache.size,
            inline: true,
          },
          {
            name: "🔗Links",
            value:
              "[Invite](https://discord.com/api/oauth2/authorize?client_id=725787532008095744&permissions=8&scope=bot) |** ** | [Support Server](https://discord.gg/fBbnrRe8gg) |** ** | [Vote for me](https://top.gg/bot/725787532008095744/vote) |** ** | [Website](https://sites.google.com/view/Mint2020-com/home) ",
            inline: true,
          }
        )

        .setThumbnail(
          message.guild.me.user.displayAvatarURL({
            dynamic: false,
            format: "png",
          })
        );

      message.channel.send(Info);

    }
}
 