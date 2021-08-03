const Discord = require("discord.js");
const WelcomeMessageSchema = require("../model/welcome-message");
const mongo = require("mongoose");

module.exports = {
  name: "welcome-message-remove",
  description: "a",
  disabled: false,
  async execute(message, args, client) {
    if (!message.member.hasPermission("ADMINISTRATOR")){
      const Permission = new Discord.MessageEmbed()
.setTitle('You need permissions!')
.setDescription('You\'re missing ``**ADMINISTRATOR**`` permissions!')
.setColor('#339295')
message.channel.send(Permission)
    }

    try {
      const RoleSchema = require("../model/welcome-message");
    const CacheofRoles = {};
    let Data = CacheofRoles[message.guild.id];

    if (!Data) {
      const Result = await RoleSchema.findOne({  guildID: message.guild.id});
      if (!Result){
        const NoRole = new Discord.MessageEmbed()
        .setTitle(`Welcome message...`)
        .setDescription(`This server didn't have a welcome message!`)
        .setColor('#339295')
        .setFooter('Category - Configs')
        message.channel.send('**Tip:** You can set a welcome message by using >welcome-message-set command.',NoRole)
      }
      else
      try {
        await RoleSchema.findOneAndDelete({
          guildID: message.guild.id
        });
        const DeletedTheSR = new Discord.MessageEmbed()
        .setTitle(`No more welcome messages..`)
        .setDescription(`Hey! I deleted your welcome messages.`)
        .setColor('#339295')
        message.channel.send(DeletedTheSR)
        
      } catch {
        return;
      }
    }
    } catch {
     return;
    }
   
  },
};
