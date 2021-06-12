const Discord = require("discord.js");

module.exports = {
  name: "ban",
  description: "a",
  disabled: false,
  execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );

    const Ban = new Discord.MessageEmbed()
      .setTitle("BAN - MODERATION")
      .setDescription(
        "`>ban <user> <reason>` - Ban a member. Add a reason."
      )

      .setTimestamp()
      .setColor("#339295");
    if (!message.guild.me.hasPermission(["BAN_MEMBERS"])){
      const PermissionNeeded = new Discord.MessageEmbed()
      .setTitle(`P E R M I S S I O N S`)
      .setDescription('*M i n t\'s Needed Permission:* [`BAN_MEMBERS`](https://support.discord.com/hc/en-us/articles/214836687-Role-Management-101) ')
      .setColor("#339295")
      .setTimestamp()
      message.channel.send(PermissionNeeded)
      return;
    }
      if(!message.member.hasPermission("BAN_MEMBERS")){
        const PermissionNeeded = new Discord.MessageEmbed()
        .setTitle(`P E R M I S S I O N S`)
        .setDescription('*Needed Permission:* [`BAN_MEMBERS`](https://support.discord.com/hc/en-us/articles/214836687-Role-Management-101) ')
        .setColor("#339295")
        .setTimestamp()
        message.channel.send(PermissionNeeded)
        return;
    }
    const Buser = message.guild.member(message.mentions.users.first());
    if (!Buser) return message.channel.send(Ban);
    let bReason = args;

    const BanMod = new Discord.MessageEmbed()
    .setTitle(`E R R O R S`)
    .setDescription(`${Buser}'s permissions are the same as yours.`)
    .setColor("#339295")
    .setTimestamp()
    if (Buser.hasPermission("BAN_MEMBERS")) return message.channel.send(BanMod);
    try {
      message.guild.member(Buser).ban({ reason: bReason });
      Buser.send(`You were banned ${Buser} with the reason of : ${bReason}`);
      return;
    } catch (er) {
      message.channel.send(
        `We ran into an error. Ask for help in the support server.`
      );
    }
  },
};
