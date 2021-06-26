const Discord = require("discord.js");
const e = require("express");
module.exports = {
  name: "help",
  description: "HELP COMMAND ",
  disabled: false,
  execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );

    const Words = message.content.slice(5);
    if (!Words) {
      message.channel.send({
        embed: {
          title: "List of commands",
          color: "#339295",
          description: 'All of the explanations of the commands are followed by another. So make sure to read the first command definition til the last to understand what it does.',
          fields:[
            {
              name: "**😴 Moderation**",
              value:
                " `>help Moderation || help m_list_2` - Help's moderating the server better with powerful commands.",
            },
            {
              name: "**🤩 Fun **",
              value:
                "`>help fun` - A server also needs to have some fun ;)",
            },
            {
              name: "🎵 Music ",
              value:
                "`>help music || help mu_list_2` - Everyone needs some type of music to listen to. ",
            },
            {
              name: "**👂 LISTENERS **",
              value:
                "`>help listeners` - A brief description of what are listeners. Enable Logging for it to work.",
            },
            {
              name: "**🛠️ Utilities **",
              value:
                "`>help Utilities || u_list_2` - Call it 'uncategorized' commands.",
            },
            {
              name: "**⚙️ Configuration**",
              value:
                "`>help configs` - Update Mint's configuration.",
            },
            {
              name: "**🏷️ Description**",
              value:
                "`>help description` - Imagine not having a description for roles...",
            },
            {
              name: "**📜 Report**",
              value:
                "``>help report` - Try reporting a user with this lmao!",
            }, {
              name: "**💌 Profile**",
              value:
                "``>help profile` - You can customize your rank card with these commands.",
            },
          ],
        },
      });
    } else if (Words.toLowerCase().includes("Moderation".toLowerCase())) {
      const ModerationHelp = new Discord.MessageEmbed()
        .setAuthor(`MODERATION - CATEGORY`)
        .addField(
          `ban`,
          "`>ban <user> <reason>` - Banning a member couldn't be this easy. "
        )
        .addField(
          `kick`,
          "`>kick <user> <reason>` - Easily kick a member out of the guild."
        )
        .addField(
          `mute`,
          "`>mute <user> <reason>` - Someone runnin their mouth a lot? You know it, mute em."
        )
        .addField(
          `unmute`,
          "`>unmute <user> <reason>` - You feel bad for muting that person? Easily unmute them."
        )
        .addField(
          `bot_nick`,
          "`>bot_nick <nickname>` - Don't like my username? Fine, use this to change my nickname!"
        )

        .setColor("#339295")
        .setTimestamp();
      message.channel.send(ModerationHelp);
    } else if (Words.toLowerCase().includes("M_list_2".toLowerCase())) {
      const ModerationHelp2 = new Discord.MessageEmbed()
        .setColor("#339295")
        .setAuthor(`MODERATION 2 - CATEGORY`)
        .setFooter(`>help Moderation for first list of commands.`)
        .addField(
          `slowmode`,
          "`slowmode <seconds>` - Chat spammin' a lot? Okay, set a timeout for chat."
        )
        .addField(
          `clear`,
          "`>clear <amount>` - Some guy just spammed 32 messages. What I did was use this command which deleted those 32 messages!"
        )
        .addField(
          `announce`,
          "`>announce <message>` - Admin needs to announce something so he uses this command."
        );
      message.channel.send(ModerationHelp2);
    } else if (Words.toLowerCase().includes("fun".toLowerCase())) {
      const Fun = new Discord.MessageEmbed()
        .setColor("#339295")
        .setAuthor(`FUN - CATEGORY`)
        .addField(
          `karen`,
          "`>karen` - Finally a time for you to fight Karen."
        )
        .addField(
          `8ball`,
          "`>8ball <prediction>` - Yes, no or maybe?"
        )
        .addField(
          `say`,
          "`>say <message>` - Will copy your message."
        )
        .addField(
          `simpmeter`,
          "`>simpmeter <user>` - Need to know if your friends are simps? Use this command man!"
        )
        .addField(
          `dogwater`,
          "`>dogwater <user>` - Your friends may be dog at the game. With this find out how much of a dogwater you are."
        )
        .addField(
          `gaymeter`,
          "`>gaymeter <user>` - Seems sus. I need to find out how sus they are!"
        );

      message.channel.send(Fun);
    } else if (Words.toLowerCase().includes("Music".toLowerCase())) {
      const Music = new Discord.MessageEmbed()
        .setColor("#339295")
        .setAuthor(`MUSIC- CATEGORY`)
        .addField(
          `play`,
          "`>play <query>` - Im gonna play a song with this command by simply add the title of it or the URL."
        )
        .addField(
          `skip`,
          "`>skip` - But you know, I don't like this song..so im gonna skip it."
        )
        .addField(
          `stop`,
          "`>stop` - Brb. I gotta do something. I must stop the song!"
        )
        .addField(
          `pause`,
          "`>pause` - Someone is speaking and I can't hear them well. Hold on, let me pause it for ya!"
        )
        .addField(
          `resume`,
          "`>resume` - Alright, he done talkin' so I can finally play the song back."
        )
        .addField(
          `lyrics`,
          "`>lyrics` - Man, I wanna sing this song so bad... I wonder what are the lyrics of it!"
        );

      message.channel.send(Music);
    } else if (Words.toLowerCase().includes("Mu_list_2".toLowerCase())) {
      const Music2 = new Discord.MessageEmbed()
        .setColor("#339295")
        .setAuthor(`MUSIC 2 - CATEGORY`)
        .addField(
          "np",
          "`>np` - I forgot what is the current song... Let me use this command."
        )
        .addField(
          `queue`,
          "`>queue` - Wonderin' what are the next up songs! *uses command*"
        )
        .addField(
          `volume`,
          "`>volume` - The volume of this track is so loud. Let me lower it."
        )
        .addField(
          `loop`,
          "`>loop` - Gosh, I love this song! Im gonna loop it over and over."
        )
        .addField(
          "leave",
          "`>leave` - Man im done with this bot, makin' him leave."
        )
        .addField(
          `join`,
          "`>join` - Nvm, im sorry Mint. Come back. *uses command*"
        );
      message.channel.send(Music2);
    } else if (Words.toLowerCase().includes("listeners".toLowerCase())) {
      const Listeners = new Discord.MessageEmbed()
        .setAuthor(`LISTENERS - CATEGORY`)

        .setColor("#339295")
        .addField(
          "MessageDelete",
          "Whenever someone deletes a message, im gonna log it in the log channel."
        )
        .addField(
          `InviteCreate/Delete`,
          "When someone creates or deletes an invite link, im also logging it."
        )
        .addField(
          "RoleDelete",
          "Poof! Deleted the Role."
        )
        .addField(
          "EmojiCreate/Delete",
          "Emoji created or Deleted will be logged as well."
        )
        .addField(
          "GuildMemberAdd/Remove",
          "When they join or leave too."
        )
        
      message.channel.send(Listeners);
    } else if (Words.toLowerCase().includes("Utilities".toLowerCase())) {
      const Utilities = new Discord.MessageEmbed()
        .setAuthor(`UTILITIES - CATEGORY`)
        .setColor("#339295")
        .addField(
          "invite",
          "`>invite` - My precious invite link so you can invite me :D"
        )
        .addField(
          "membercount",
          "`>membercount` - Used to find out how many members in ya server!"
        )
        .addField(
          "verify",
          "`>verify` - Basic verify command."
        )
        .addField(
          "info",
          "`>info` - Stats and information about Mint."
        );
      message.channel.send(Utilities);
    } else if (Words.toLowerCase().includes("u_list_2".toLowerCase())) {
      const u_list_2 = new Discord.MessageEmbed()
        .setAuthor(`UTILITIES 2 - CATEGORY`)
        .setColor("#339295")
        .addField(
          "avatar",
          "`>avatar <mentionuser>` - Shows the avatar of the person."
        )
        .addField(
          `guild`,
          "`>guild` - Information about server."
        )
        .addField(
          "getID",
          "`>getID <channel>` - Get ID of the channel you wanted."
        )
        .addField(
          "getuserID",
          "`>getuserID <user>` - Get the ID of an user."
        )
        .addField(
          "report",
          "`>report <issue>` - Report something."
        )
        .addField(
          "credits",
          "`>credits` - Credits of Mint."
        )
        .addField(
          "credit",
          "`>credit <user> <reason>` - To credit someone's work."
        )
        .addField(
          "spotify",
          "`>spotify <user>` - Find what song is the person listening to."
        );
      message.channel.send(u_list_2);
    } else if (Words.toLowerCase().includes("configs".toLowerCase())) {
      const Config = new Discord.MessageEmbed()
        .setAuthor(`CONFIGS - CATEGORY`)
        .setColor("#339295")
        .addField(
          `premium`,
          "**THIS COMMAND WILL ONLY WORK ON UPDATE 3.0!**`>premium` - This is a premium command, the bot will think of a number in it's and if you guess it, you get premium for your guild for free."
        )
        .addField(
          "levels",
          "`>levels (enable/disable)` - Enable/Disable 'Levels' category for this server"
        )
        .addField(
          `autorole_add]`,
          "`>autorole_add` - Select a role to give to every member that joins."
        )
        .addField(
          `autorole_remove`,
          "`>autorole_remove` - Remove that autorole."
        )
        .addField(
          `loggings`,
          "`>loggings <enable/disable>` - Enable/Disable logging category."
        )
        .addField(
          `welcome-message-set`,
          "`>welcome-message-set <message>` - Automatically set a welcome message."
        )
        .addField(
          `welcome-message-remove`,
          "`>welcome-message-remove` - Remove that welcome message."
        );
      message.channel.send(Config);
    } else if (Words.toLowerCase().includes("nsfw".toLowerCase())) {
      const attachment = new Discord.MessageAttachment(`caught.gif`);
      message.channel.send(`📸📸Caught on 4K`, attachment);
    } else if (Words.toLowerCase().includes("description".toLowerCase())) {
      const Config = new Discord.MessageEmbed()
        .setAuthor(`DESCRIPTION- CATEGORY`)
        .setColor("#339295")
        .addField(
          "role_description_add",
          "`>roles_description_add <@Role> <description>` - Insert a description for a valued role."
        )
        .addField(
          `role_description_remove`,
          "`>roles_description_remove <@Role>` -  Now remove that description."
        )
        .addField(
          `role_description`,
          "`>role_description <@Role>` - If the mentionned role has a description, it will show."
        );

      message.channel.send(Config);
    } else if (Words.toLowerCase().includes("report".toLowerCase())) {
      const Config = new Discord.MessageEmbed()
        .setAuthor(`REPORT - CATEGORY`)
        .setColor("#339295")
        .addField(
          "report_channel_add",
          "`>report_channel_add` - Add a report channel. (Logs reports in it.)"
        )
        .addField(
          `report_channel_remove`,
          "`>report_channel_remove` - Remove that report channel."
        )
        .addField(
          `report`,
          "`>report` -  Report a user/server."
        );

      message.channel.send(Config);
    } else if (Words.toLowerCase().includes("profile".toLowerCase())){
      const ProfileHelp = new Discord.MessageEmbed()
      .setTitle('Profiles')
      .addField('default', '`>profile default` - Profile card will use the default template.')
      .addField('text-color', '`>profile text-color <color> or <color code> - Automatically change the color of the text.`')
      .addField('username', '`>profile username <name>` - You can put a custom username for your card.')
      .addField('background', '`>profile background <url>` - You can change the background of your card by putting a link of it. Sometimes, the background would be the same if the URL was not supported for the bot.')
     .addField('reset', '`>profile reset` - You can reset your custom settings for the card.')
     .setColor("WHITE")
     .setTimestamp()
     message.channel.send(ProfileHelp)
    }else
      return message.channel.send(`The category **${Words}** does not exist.`);
  },
};
