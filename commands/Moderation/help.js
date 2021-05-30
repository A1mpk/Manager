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
          color: "BLUE",
          fields: [
            {
              name: "**😴 Moderation**",
              value:
                " `>help Moderation || help m_list_2` - This section helps keep your server and community safe, secure and in control with these commands at your disposal.",
            },
            {
              name: "**🤩 Fun **",
              value:
                "`>help fun` - This section can keep your server fun & enjoyable with these commands.",
            },
            {
              name: "🎵 Music ",
              value:
                "`>help music || help mu_list_2` - This section is made for playing musics, if bored & want to find out new tracks, members of this server can always play a track to keep the server comfortable.",
            },
            {
              name: "**👂 LISTENERS **",
              value:
                "`>help listeners` - This section is made for logging, to keep track of what is happening on your server & helps in moderation commands.",
            },
            {
              name: "**🛠️ Utilities **",
              value:
                "`>help Utilities || u_list_2` - This section is about Utilities, commands that gives you information. such as membercount,verification,getID,getUserID.",
            },
            {
              name: "**⚙️ Configuration**",
              value:
                "`>help configs` - Config category, you can change the settings here to make your guild suit you! ",
            },
            {
              name: "**🏷️ Description**",
              value:
                "`>help description` - Role description category, you can now put description for a role. ",
            },
            {
              name: "**📜 Report**",
              value:
                "``>help report` - Report category, you can now report things if you don't like something about this guild or report an user.",
            },
          ],
        },
      });
    } else if (Words.toLowerCase().includes("Moderation".toLowerCase())) {
      const ModerationHelp = new Discord.MessageEmbed()
        .setAuthor(`MODERATION - CATEGORY`)
        .addField(
          `ban`,
          "`>ban <user> <reason>` - This will just ban the mentionned if provided with a reason. "
        )
        .addField(
          `kick`,
          "`>kick <user> <reason>` - This is a kick command, it kicks the mentionned user if provided with a reason!"
        )
        .addField(
          `mute`,
          "`>mute <user> <reason>` - This is a mute command, it mutes the mentionned user if provided with a reason!"
        )
        .addField(
          `unmute`,
          "`>unmute <user> <reason>` - This is an unmute command, it mutes the mentionned user if provided with a reason!"
        )
        .addField(
          `bot_nick`,
          "`>bot_nick <nickname>` - This is a bot_nick command, it changes the bot's nickname."
        )

        .setColor("BLUE")
        .setTimestamp();
      message.channel.send(ModerationHelp);
    } else if (Words.toLowerCase().includes("M_list_2".toLowerCase())) {
      const ModerationHelp2 = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setAuthor(`MODERATION 2 - CATEGORY`)
        .setFooter(`>help Moderation for first list of commands.`)
        .addField(
          `slowmode`,
          "`slowmode <seconds>` - This is a slowmode command, it increases the slowmode of the channel to the chosen one."
        )
        .addField(
          `clear`,
          "`>clear <amount>` - This is a clear command, it deletes the amount of messages wanted."
        )
        .addField(
          `announce`,
          "`>announce <message>` - This is just an announce command, it announces a announcement as an embed format."
        );
      message.channel.send(ModerationHelp2);
    } else if (Words.toLowerCase().includes("fun".toLowerCase())) {
      const Fun = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setAuthor(`FUN - CATEGORY`)
        .addField(
          `karen`,
          "`>karen` - This is a karen command, it returns with questions & messages which you will you have to reply to. Once finished you will know who won."
        )
        .addField(
          `8ball`,
          "`>8ball <prediction>` - This is just the 8ball command, it will return a yes, no or maybe to your question."
        )
        .addField(
          `say`,
          "`>say <message>` - This is a say command, it repeats your message."
        )
        .addField(
          `simpmeter`,
          "`>simpmeter <user>` - This is a simpmeter command, it shows how much of a simp you are."
        )
        .addField(
          `dogwater`,
          "`>dogwater <user>` - This is a dogwater command, it shows how dogwater you literally are."
        )
        .addField(
          `gaymeter`,
          "`>gaymeter <user>` - This is a gaymeter command, it shows how gay you are."
        );

      message.channel.send(Fun);
    } else if (Words.toLowerCase().includes("Music".toLowerCase())) {
      const Music = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setAuthor(`MUSIC- CATEGORY`)
        .addField(
          `play`,
          "`>play <query>` - This is a play command, it plays track in a voice channel. The query can either be a link or a YouTube keyword."
        )
        .addField(
          `skip`,
          "`>skip` - This is just the skip command, it will skip the current track if being played."
        )
        .addField(
          `stop`,
          "`>stop` - This is a stop command, it will stop the current track."
        )
        .addField(
          `pause`,
          "`>pause` - This is a pause command, it pauses the track."
        )
        .addField(
          `resume`,
          "`>resume` - This is a resume command, it will resume the track."
        )
        .addField(
          `lyrics`,
          "`>lyrics` - This is a lyrics command, it shows the lyrics of the track if found."
        );

      message.channel.send(Music);
    } else if (Words.toLowerCase().includes("Mu_list_2".toLowerCase())) {
      const Music2 = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setAuthor(`MUSIC 2 - CATEGORY`)
        .addField(
          "np",
          "`>np` - This is a now-playing command, it shows the currently playing track."
        )
        .addField(
          `queue`,
          "`>queue` - This is just a queue command, it will show the current queue of the tracks in this server."
        )
        .addField(
          `volume`,
          "`>volume` - This is a volume command, it will change the volume of the bot."
        )
        .addField(
          `loop`,
          "`>loop` - This is a loop command, it loops the track over and over."
        )
        .addField(
          "leave",
          "`>leave` - This command is a leave command, it leaves the current voice channel & deletes the queue."
        )
        .addField(
          `join`,
          "`>join` - This is just a join command, it deletes the queue, joins the voice channel."
        );
      message.channel.send(Music2);
    } else if (Words.toLowerCase().includes("listeners".toLowerCase())) {
      const Listeners = new Discord.MessageEmbed()
        .setAuthor(`LISTENERS - CATEGORY`)

        .setColor("BLUE")
        .addField(
          "MessageDelete",
          "This is from the logging category, it log's every deleted messages into the logging channel."
        )
        .addField(
          `InviteCreate/Delete`,
          "This is a logging function, it logs it in the logging channel whenever an invite is created/deleted."
        )
        .addField(
          "RoleDelete",
          "This is a logging function, it log's it in the logging channel whenever a role is deleted."
        )
        .addField(
          "EmojiCreate/Delete",
          "This is a logging function, it log's it in the logging channel whenever a Emoji is created/deleted."
        )
        .addField(
          "GuildMemberAdd/Remove",
          "This is a logging function, it log's it in the logging channel whenever a member joins/leave."
        )
        .addField(
          "Autorole",
          "`>autorole_add <roleID>` - This is just the autorole command, everytime a user joins it gives them that role."
        );
      message.channel.send(Listeners);
    } else if (Words.toLowerCase().includes("Utilities".toLowerCase())) {
      const Utilities = new Discord.MessageEmbed()
        .setAuthor(`UTILITIES - CATEGORY`)
        .setColor("BLUE")
        .addField(
          "invite",
          "`>invite` - This is just an invite command, it sends you an invite link so you can invite Mint."
        )
        .addField(
          "membercount",
          "`>membercount` - This is just a membercount command, it shows the amount of members in the server."
        )
        .addField(
          "verify",
          "`>verify` - This is just a verify command, it verifies you as a verified member of the server."
        )
        .addField(
          "info",
          "`>info` - This is just an info command, it shows you information about Mint."
        );
      message.channel.send(Utilities);
    } else if (Words.toLowerCase().includes("u_list_2".toLowerCase())) {
      const u_list_2 = new Discord.MessageEmbed()
        .setAuthor(`UTILITIES 2 - CATEGORY`)
        .setColor("BLUE")
        .addField(
          "avatar",
          "`>avatar <mentionuser>` - This is just an avatar command, it shows you the avatar of the mentionned user."
        )
        .addField(
          `guild`,
          "`>guild` - This is just a guild command, it shows you information about the server."
        )
        .addField(
          "getID",
          "`>getID <channel>` - This is just a getID command, it shows you the ID of the channel name you wrote."
        )
        .addField(
          "getuserID",
          "`>getuserID <user>` - This is just a getuserID command, it shows you the ID of the user you mentionned."
        )
        .addField(
          "report",
          "`>report <issue>` - This is just a report command, it sends a report to the owner of the guild."
        )
        .addField(
          "credits",
          "`>credits` - This is just the credits command, it shows the credits of the bot."
        )
        .addField(
          "credit",
          "`>credit <user> <reason>` - This is just a credit command, it credits the user you mentionned with the reason."
        )
        .addField(
          "spotify",
          "`>spotify <user>` - This command is just a spotify command, it shows basic information about the track a mentionned user is listening to."
        );
      message.channel.send(u_list_2);
    } else if (Words.toLowerCase().includes("configs".toLowerCase())) {
      const Config = new Discord.MessageEmbed()
        .setAuthor(`CONFIGS - CATEGORY`)
        .setColor("BLUE")
        .addField(
          `premium`,
          "**THIS COMMAND WILL ONLY WORK ON UPDATE 3.0!**`>premium` - This is a premium command, the bot will think of a number in it's and if you guess it, you get premium for your guild for free."
        )
        .addField(
          "levels",
          "`>levels (enable/disable)` - This is the levels command, if the input is set to enabled, it levelling will be enabled in this guild."
        )
        .addField(
          `autorole_add]`,
          "`>autorole_add` - This is a autorole_add command, it gives the mentionned role to every new members joining this guild."
        )
        .addField(
          `autorole_remove`,
          "`>autorole_remove` - This is a autorole_remove command, it resets the autorole system in this guild, making it fresh."
        )
        .addField(
          `loggings`,
          "`>loggings <enable/disable>` - This is the loggings command, to enable logging you can simply use this command and it will set the logging to your current channel."
        )
        .addField(
          `welcome-message-set`,
          "`>welcome-message-set <message>` - This is the welcome message command, it will send a welcome message everytime a user joins the server. (In private messages)"
        )
        .addField(
          `welcome-message-remove`,
          "`>welcome-message-remove` - This is the remove welcome message command, it will remove the message that was set for welcome message command."
        );
      message.channel.send(Config);
    } else if (Words.toLowerCase().includes("nsfw".toLowerCase())) {
      const attachment = new Discord.MessageAttachment(`caught.gif`);
      message.channel.send(`📸📸Caught on 4K`, attachment);
    } else if (Words.toLowerCase().includes("description".toLowerCase())) {
      const Config = new Discord.MessageEmbed()
        .setAuthor(`DESCRIPTION- CATEGORY`)
        .setColor("BLUE")
        .addField(
          "role_description_add",
          "`>roles_description_add <@Role> <description>` - This command lets you put a description for the mentionned role."
        )
        .addField(
          `role_description_remove`,
          "`>roles_description_remove <@Role>` -  This command deletes the roles the description. "
        )
        .addField(
          `role_description`,
          "`>role_description <@Role>` -  it sends the description of the mentionned role if a Administrator/Moderator has set a description for that role. "
        );

      message.channel.send(Config);
    } else if (Words.toLowerCase().includes("report".toLowerCase())) {
      const Config = new Discord.MessageEmbed()
        .setAuthor(`REPORT - CATEGORY`)
        .setColor("BLUE")
        .addField(
          "report_channel_add",
          "`>report_channel_add` - With this command you can create a report channel, this is a really important command because without this you cannot run the report command. It basically makes it that it sends the new reports to that channel."
        )
        .addField(
          `report_channel_remove`,
          "`>report_channel_remove` -  This command deletes the channel from the database. "
        )
        .addField(
          `report`,
          "`>report` -  This command sends a copy of your report to the Report channel where Admins can reach you out afterwards. "
        );

      message.channel.send(Config);
    } else
      return message.channel.send(`The category **${Words}** does not exist.`);
  },
};
