const Discord = require("discord.js");
const AutoRoleSchema = require("../model/AutoRole");
const mongo = require("mongoose");

module.exports = {
  name: "autorole_add",
  description: "a",
  disabled: false,
  async execute(message) {
    if (!message.member.hasPermission("MANAGE_ROLES")){
      const Permission = new Discord.MessageEmbed()
.setTitle('You need permissions!')
.setDescription('You\'re missing ``**MANAGE_ROLES**`` permissions!')
.setColor('#339295')
message.channel.send(Permission)
    }
    const ROLEID = message.content.slice(14);
    if (!ROLEID) {
      const LOL = new Discord.MessageEmbed()
        .setColor("#339295")
        .setAuthor("AUTOROLE_ADD - LOGGING")
        .setDescription(
          "`>autorole_add <roleID>` - Select a role to give to every member that joins."
        )
        .addField(
          "Sub Commands",
          "`autorole_remove` - Remove that autorole."
        )

        .setTimestamp();
      message.channel.send(LOL);
    }

    if (ROLEID) {
      if (isNaN(ROLEID)){
        const Error = new Discord.MessageEmbed()
        .setTitle(`Something went wrong...`)
        .setDescription('A role ID can only contain numbers!')
        .setColor("#339295")
        .setTimestamp()
        message.channel.send(Error)
      }
      const ROLEFIND = message.guild.roles.cache.find(
        (role) => ROLEID === role.id
      );
      if (!ROLEFIND)
       {
        const Error = new Discord.MessageEmbed()
        .setTitle(`Something went wrong...`)
        .setDescription('I couldn\'t find that role!')
        .setColor("#339295")
        .setTimestamp()
        message.channel.send(Error)
        return undefined 
       }
      else
        try {
          try {
            await AutoRoleSchema.findOneAndUpdate(
              {
                _id: message.guild.id,
              },
              {
                _id: message.guild.id,
                guildName: message.guild.name,
                autorole: ROLEID,
              },
              {
                upsert: true,
              }
            );
            const Success = new Discord.MessageEmbed()
            .setTitle(`Great! You now have set an autorole!`)
            .setDescription('Mint will now give them that role every time a user joins.')
            .setColor("#339295")
            .setTimestamp()
            message.channel.send(Success)
          } catch (er) {
            return message.channel.send(er);
          }
        } catch (er) {
          message.channel.send(er);
        }
    }
  },
};
