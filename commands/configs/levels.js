const Discord = require("discord.js");
const LevelsSchema = require("../model/levels");
const {MessageButton} = require('discord-buttons')
module.exports = {
  name: "levels",
  description: "Levels",
  disabled: false,
  async execute(message, args) {
    const ANswer = message.content.slice(7);
    if (!message.member.hasPermission("ADMINISTRATOR")){
      const Permission = new Discord.MessageEmbed()
.setTitle('You need permissions!')
.setDescription('You\'re missing ``**ADMINISTRATOR**`` permissions!')
.setColor('#339295')
message.channel.send(Permission)
    }
      const LEvelsNoNo = new Discord.MessageEmbed()
      .setAuthor("LEVELS - LEVELLING")
      .setDescription(
        "`>levels` - Enable/Disable Levels category for this guild.."
      )
      .setTimestamp()

      .setColor("#339295");
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
                await LevelsSchema.findOneAndUpdate(
                  {
                    guildID: message.guild.id,
                  },
                  {
                    levels: "enable",
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
             .setTitle('Levels:')
             .setDescription(`Levels is a feature of Mint which allows you to receive XPs everytime you message on a channel.`)
             .setFooter(`Each user's xp is noted in our database.`)
             .setColor("#339295")
             .setFooter('Category - Configs')
            fullmessage.edit(Listeners);
          } else if (b.id == "3") {
            try {
              try {
                await LevelsSchema.findOneAndUpdate(
                  {
                    guildID: message.guild.id,
                  },
                  {
                    levels: "disable",
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
            const DisabledButton = new Discord.MessageEmbed()
              .setTitle(`Disabled`)
              .setDescription("Disabled Levelling for this server.")
              .setColor("#339295")
              .setTimestamp();
            fullmessage.edit(DisabledButton);
          }
        });
        collector.on("end", () => {
          message.channel.send(`Error: 20s time limit was reached.`);
        });
  },
};
