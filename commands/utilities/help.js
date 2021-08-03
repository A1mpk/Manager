const Discord = require("discord.js");
const e = require("express");
const {MessageButton} = require('discord-buttons')
module.exports = {
  name: "help",
  description: "HELP COMMAND ",
  disabled: false,
 async execute(message, args) {
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
          description: '*What\'s new?* Brand new design for Mint. **Update: 2.0.9**',
          fields:[
            {
              name: "**⚙️ Configuration**",
              value:
                "`>help configs` - Update Mint's settings to your preference.",
            },
            {
              name: "**:sleeping: Moderation**",
              value:
                " `>help Moderation  ` - Help's moderating the server better with powerful commands.",
            },
            {
              name: "**🛠️ Utilities **",
              value:
                "`>help Utilities ` - Commands that are uncategorized.",
            },
            {
              name: "**🏷️ Description**",
              value:
                "`>help description` - Mint's unique category! Add a description for your role.",
            },
             {
              name: "**💌 Profile**",
              value:
                "``>help profile` - You can customize your rank card with these commands.",
            },
            {
              name: "**🤩 Fun **",
              value:
                "`>help fun` - Fun commands to bring in a bit of joy.",
            },
            {
              name: "🎵 Music ",
              value:
                "`>help music` - Listen to music through Mint.",
            },
          ],
        },
      });
    } else if (Words.toLowerCase().includes("Moderation".toLowerCase())) {
      const button = new MessageButton()
      .setStyle("grey")
      .setID("1")
      .setLabel(`Page 1`);
    const button2 = new MessageButton()
      .setStyle("grey")
      .setID("2")
      .setLabel(`Page 2 `);
      const ModerationHelp = new Discord.MessageEmbed()
        .setAuthor(`MODERATION - CATEGORY`)
        .addField(
          `ban`,
          "`>ban <user> <reason>` - Ban a member with this powerful command."
        )
        .addField(
          `kick`,
          "`>kick <user> <reason>` - Easily kick a member with an appropriate reason."
        )
        .addField(
          `mute`,
          "`>mute <user> <reason>` - Mute's the member. Be aware that this is a permanent mute. To undo, use the command below."
        )
        .addField(
          `unmute`,
          "`>unmute <user> <reason>` - Unmute's the member from the permanent mute."
        )
        .addField(
          `bot_nick`,
          "`>bot_nick <nickname>` - Change Mint's username to your liking."
        )

        .setColor("#339295")
        .setTimestamp();
        const ModerationHelp2 = new Discord.MessageEmbed()
        .setColor("#339295")
        .setAuthor(`MODERATION 2 - CATEGORY`)
       
        .addField(
          `slowmode`,
          "`slowmode <seconds>` - Set a slowmode for the chat."
        )
        .addField(
          `clear`,
          "`>clear <amount>` - Easily delete 100 or less messages!"
        )
        .addField(
          `announce`,
          "`>announce <message>` - You can use this command to make your announcement as an embed."
        );
        let fullmessage = await message.channel.send(ModerationHelp, {
          buttons: [button, button2],
        });
        const collector = fullmessage.createButtonCollector(
          (button) => button.clicker.id === message.author.id,
          { time: 360e3 }
        );
        collector.on("collect", async (b) => {
          b.reply.defer();
          if (b.id == "1") {
            fullmessage.edit(ModerationHelp)
          }else if(b.id == "2"){
            fullmessage.edit(ModerationHelp2)
          }
        })
    }  else if (Words.toLowerCase().includes("fun".toLowerCase())) {
      const Fun = new Discord.MessageEmbed()
        .setColor("#339295")
        .setAuthor(`FUN - CATEGORY`)
        
        .addField(
          `karen`,
          "`>karen` - Fight Karen"
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
          "`>simpmeter <user>` - Need to know if your friends are simps? Use this command."
        )
        .addField(
          `dogwater`,
          "`>dogwater <user>` - Your friends may be dog at the game. With this find out how much of a dogwater you are."
        )
        .addField(
          `gaymeter`,
          "`>gaymeter <user>` - How gay are you?"
        );
        
      message.channel.send(Fun);
    } else if (Words.toLowerCase().includes("Music".toLowerCase())) {
      const button = new MessageButton()
      .setStyle("grey")
      .setID("1")
      .setLabel(`Page 1`);
    const button2 = new MessageButton()
      .setStyle("grey")
      .setID("2")
      .setLabel(`Page 2 `);
      const Music = new Discord.MessageEmbed()
        .setColor("#339295")
        .setAuthor(`MUSIC- CATEGORY`)
       
        .addField(
          `play`,
          "`>play <query>` - Play a track with the URl or simply with the track title."
        )
        .addField(
          `skip`,
          "`>skip` - Skip the current track."
        )
        .addField(
          `stop`,
          "`>stop` - Stop's the track."
        )
        .addField(
          `pause`,
          "`>pause` - Pause's the track."
        )
        .addField(
          `resume`,
          "`>resume` - Resume's the track if paused."
        )
        .addField(
          `lyrics`,
          "`>lyrics` - Tries to find the lyrics of the current track."
        );
        const Music2 = new Discord.MessageEmbed()
        .setColor("#339295")
        .setAuthor(`MUSIC 2 - CATEGORY`)
       
        .addField(
          "np",
          "`>np` - Find out the current track's name, duration, looped?, queue looped?"
        )
        .addField(
          `queue`,
          "`>queue` - Keep track of the queue."
        )
        .addField(
          `volume`,
          "`>volume` - Turn up the volume up to 5."
        )
        .addField(
          `loop`,
          "`>loop` - Loop's the song. "
        )
        .addField(
          "leave",
          "`>leave` - Reset's queue + leaves channel."
        )
        .addField(
          `join`,
          "`>join` - Reset's queue + join's channel."
        );
        let fullmessage = await message.channel.send(Music, {
          buttons: [button, button2],
        });
        const collector = fullmessage.createButtonCollector(
          (button) => button.clicker.id === message.author.id,
          { time: 360e3 }
        );
        collector.on("collect", async (b) => {
          b.reply.defer();
          if (b.id == "1") {
            fullmessage.edit(Music)
          }else if(b.id == "2"){
            fullmessage.edit(Music2)
          }
        })
    } else if (Words.toLowerCase().includes("listeners".toLowerCase())) {
      const Listeners = new Discord.MessageEmbed()
      .setAuthor(`LISTENERS - CATEGORY`)
      
      .setColor("#339295")
      .addField("MessageDelete", "Logs all the deleted messages.")
      .addField(`InviteCreate/Delete`, "Logs all the deleted invites!")
      .addField("RoleDelete", "Logs all the deleted roles.")
      .addField(
        "EmojiCreate/Delete",
        "Logs all the created/deleted emojies."
      )
      .addField(
        "GuildMemberAdd/Remove",
        "Logs when a member joins (or) leaves the guild."
      );
        
      message.channel.send(Listeners);
    } else if (Words.toLowerCase().includes("Utilities".toLowerCase())) {
      const button = new MessageButton()
      .setStyle("grey")
      .setID("1")
      .setLabel(`Page 1`);
    const button2 = new MessageButton()
      .setStyle("grey")
      .setID("2")
      .setLabel(`Page 2 `);
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
        )
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
          let fullmessage = await message.channel.send(Utilities, {
            buttons: [button, button2],
          });
          const collector = fullmessage.createButtonCollector(
            (button) => button.clicker.id === message.author.id,
            { time: 360e3 }
          );
          collector.on("collect", async (b) => {
            b.reply.defer();
            if (b.id == "1") {
              fullmessage.edit(Utilities)
            }else if(b.id == "2"){
              fullmessage.edit(u_list_2)
            }
          })
    } else if (Words.toLowerCase().includes("configs".toLowerCase())) {
      const Config = new Discord.MessageEmbed()
        .setAuthor(`CONFIGS - CATEGORY`)
        .setColor("#339295")
        .addField(
          `premium`,
          "Coming soon. At Update 3.0"
        )
        .addField(
          "levels",
          "`>levels` - Enable/Disable 'Levels' category for this server"
        )
        .addField(
          `autorole_add`,
          "`>autorole_add` - Select a role to give to every member that joins."
        )
        .addField(
          `autorole_remove`,
          "`>autorole_remove` - Remove that autorole."
        )
        .addField(
          `loggings`,
          "`>loggings ` - Enable/Disable logging category."
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
          "`>roles_description_remove <@Role>` - Removes that description."
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
        .setFooter(`To Note: The descriptions are examples.`)
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
     .setColor("#339295")
     .setTimestamp()
     message.channel.send(ProfileHelp)
    }else
      return message.channel.send(`The category **${Words}** does not exist.`);
  },
};
