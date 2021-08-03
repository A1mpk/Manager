const Discord = require("discord.js");
module.exports = {
  name: "nick",
  description: "Nicks the message.member.userSetNickname(lol)",
  disabled: false,
  execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );
      const Permission = new Discord.MessageEmbed()
      .setTitle('I need permissions!')
      .setDescription('Im missing ``**MANAGE_NICKNAMES**`` permissions!')
      .setColor('#339295')
      const Permission2 = new Discord.MessageEmbed()
      .setTitle('You need permissions!')
      .setDescription('You\'re missing ``**MANAGE_NICKNAMES**`` permissions!')
      .setColor('#339295')
    if (!message.guild.me.hasPermission(["MANAGE_NICKNAMES"])){
      message.channel.send(Permission)
    }
    const lol = message.content.slice(5);
const LOL = new Discord.MessageEmbed()
.setTitle('Missing Nickname..')
.setDescription('You didnt write your new nickname!')
.setColor('#339295')
const DSA = new Discord.MessageEmbed()
.setTitle('Owner Privileges')
.setDescription('Since your the owner, I cannot change your nickname')
.setColor('#339295')
const OwnerPriv = new Discord.MessageEmbed()
.setTitle('Max Characters')
.setDescription('Your nickname contains more than 32 characters!')
.setColor('#339295')
const pmgdsa = new Discord.MessageEmbed()
.setTitle('Minimum Characters')
.setDescription('Your nickname must contain more than 2 characters!')
.setColor('#339295')
const ChangedNick = new Discord.MessageEmbed()
.setTitle('Changed Nickname')
.setDescription('I just changed your nickname as you wanted.')
.setColor('#339295')

if (message.member === message.guild.owner) {
      message.channel.send(DSA);
    } else if (message.member.hasPermission("CHANGE_NICKNAME")) {
      if (!lol) {
        message.channel.send(LOL);
        return undefined
      }
      if (lol) {
        if (lol.length > 32){
          message.channel.send(
            OwnerPriv
           );
           return undefined
        }
         
          
        if (lol.length < 1) {
          message.channel.send(
          pmgdsa
          
          );
          return undefined
        } else message.member.setNickname(lol);
        if (message.member === message.guild.owner) return;
        message.channel.send(
         ChangedNick
        );
      }
    } else message.channel.send(Permission2);
  },
};
