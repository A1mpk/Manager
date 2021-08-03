const { MessageButton } = require("discord-buttons");
const Discord = require("discord.js");
const LoggingSchema = require("../model/LoggingSchema");

module.exports = {
  name: "loggings",
  description: "Logggings",
  disabled: false,
  async execute(message, args) {
    if (this.disabled)
      return message.channel.send(
        `This is a new command, its still being worked on.`
      );
const Permission = new Discord.MessageEmbed()
.setTitle('You need permissions!')
.setDescription('You\'re missing ``**ADMINISTRATOR**`` permissions!')
.setColor('#339295')
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(Permission)
    const button = new MessageButton()
      .setStyle("green")
      .setID("1")
      .setLabel(`Enable`);
    const button2 = new MessageButton()
      .setStyle("grey")
      .setID("2")
      .setLabel(`❔`);
    const button3 = new MessageButton()
      .setStyle("red")
      .setID("3")
      .setLabel(`Disable`);

    const LEvelsNoNo = new Discord.MessageEmbed()
      .setAuthor("LOGGINGS - CONFIG")
      .setDescription("This command uses buttons to interact.")
      .setTimestamp()

      .setColor("#339295");
    let fullmessage = await message.channel.send(LEvelsNoNo, {
      buttons: [button, button2, button3],
    });
    const collector = fullmessage.createButtonCollector(
      (button) => button.clicker.id === message.author.id,
      { time: 20e3 }
    );
    collector.on("collect", async (b) => {
      b.reply.defer();
      if (b.id == "1") {
        try {
          try {
            await LoggingSchema.findOneAndUpdate(
              {
                guildID: message.guild.id,
              },
              {
                channel: message.channel.id,
                guildID: message.guild.id,
                guildName: message.guild.name,
              },
              {
                upsert: true,
              }
            );
          } catch (er) {
            return message.channel.send(er);
          }
        } catch (er) {
          message.channel.send(er);
        }
        const DoneButton = new Discord.MessageEmbed()
          .setTitle(`Enabled`)
          .setDescription("Enabled Logging for this server.")
          .setColor("#339295")
          .setTimestamp();
        fullmessage.edit(DoneButton);
      } else if (b.id == "2") {
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
        fullmessage.edit(Listeners);
      } else if (b.id == "3") {
        try {
          try {
            await LoggingSchema.findOneAndDelete({
              guildID: message.guild.id,
            });
          } catch (er) {
            return message.channel.send(er);
          }
        } catch (er) {
          message.channel.send(er);
        }
        const DisabledButton = new Discord.MessageEmbed()
          .setTitle(`Disabled`)
          .setDescription("Disabled Logging for this server.")
          .setColor("#339295")
          .setTimestamp();
        fullmessage.edit(DisabledButton);
      }
    });
 
  },
};
