const Discord = require("discord.js");

module.exports = {
  name: "kick",
  description: "kicks a member",
  disabled: false,
  execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );

    const Kick = new Discord.MessageEmbed()
      .setTitle("KICK - MODERATION")
      .setDescription(
        "`>kick <user> <reason>` - Kicks a member. Add a reason."
      )

      .setColor("#339295")
      .setTimestamp();
    if (!message.guild.me.hasPermission(["KICK_MEMBERS"])){
      const PermissionNeeded = new Discord.MessageEmbed()
      .setTitle(`P E R M I S S I O N S`)
      .setDescription('*M i nt\'s Needed Permission:* [`KICK_MEMBERS`](https://support.discord.com/hc/en-us/articles/214836687-Role-Management-101) ')
      .setColor("#339295")
      .setTimestamp()
      message.channel.send(PermissionNeeded)
      return;
    }
    if (!message.member.hasPermission("KICK_MEMBERS")){
      const PermissionNeeded = new Discord.MessageEmbed()
      .setTitle(`P E R M I S S I O N S`)
      .setDescription('*Needed Permission:* [`KICK_MEMBERS`](https://support.discord.com/hc/en-us/articles/214836687-Role-Management-101) ')
      .setColor("#339295")
      .setTimestamp()
      message.channel.send(PermissionNeeded)
      return;
    }
    const Kuser = message.guild.member(message.mentions.users.first());
    if (!Kuser) return message.channel.send(Kick);
    let kReason = args.join(" ").slice(22);
    const KickMod = new Discord.MessageEmbed()
    .setTitle(`E R R O R S`)
    .setDescription(`${Kuser}'s permissions are the same as yours.`)
    .setColor("#339295")
    .setTimestamp()
    if (Kuser.hasPermission("KICK_MEMBERS"))
      return message.channel.send(KickMod);

    message.guild.member(Kuser).kick(kReason);
    Kuser.send(
      `You were kicked from the server with the reason of  ${kReason}`
    );
    message.channel.send(`I have kicked ${Kuser} for  ${kReason}`);
    return;
  },
};
