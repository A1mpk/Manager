const Discord = require("discord.js");
module.exports = {
  name: "unmute",
  description: "UnMute member",
  disabled: false,
  execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );
    const Permission = new Discord.MessageEmbed()
      .setTitle("I need permissions!")
      .setDescription("Im missing ``**MANAGE_ROLES**`` permissions!")
      .setColor("#339295");

    if (!message.guild.me.hasPermission(["MANAGE_ROLES"]))
      return message.channel.send(Permission);
    const Permission2 = new Discord.MessageEmbed()
      .setTitle("You need permissions!")
      .setDescription("You're missing ``**MANAGE_ROLES**`` permissions!")
      .setColor("#339295");
    const ReasonWhat = new Discord.MessageEmbed()
      .setDescription("You need to include the reason for this unmute!")
      .setTitle("Why unmute?")
      .setColor("#339295");

    const MuteROle = message.guild.roles.cache.find(
      (Role) => Role.name === "Muted"
    );
    const UserToMute = message.mentions.users.first();
    const Reason = message.content.slice(30);

    // CHECKING IF MUTE ROLE FOUND WORKS
    if (!MuteROle) {
      const Mentionsome = new Discord.MessageEmbed()
        .setDescription(
          "You need to create an role called Muted and remove permission to send messages."
        )
        .setTitle("Missing Role: Muted")
        .setColor("#339295");
      message.channel.send(Mentionsome);
      return undefined;
    }
    // Reasons for mute (not needed?) WORKS
    if (message.member.hasPermission(["MANAGE_ROLES"])) {
      if (!UserToMute) {
        const Mentionsome = new Discord.MessageEmbed()
          .setDescription("You need to mention a user to unmute.")
          .setTitle("Who are you unmuting?")
          .setColor("#339295");
        message.channel.send(Mentionsome);
        return undefined;
      }

      // Add the mute command to the G
      const Mentionsome2 = new Discord.MessageEmbed()
        .setDescription(`I unmuted ${UserToMute}. `)
        .setTitle("Unmuted them")
        .setColor("#339295");
      if (!Reason) return message.channel.send(ReasonWhat);
      if (Reason) {
        if (!message.guild.member(UserToMute).roles.cache.get(MuteROle.id)) {
          const Mentionsome = new Discord.MessageEmbed()
            .setDescription("That user is already unmuted...")
            .setTitle("Unmute them again?")
            .setColor("#339295");
          message.channel.send(Mentionsome);
          return undefined;
        } else if (
          message.guild.member(UserToMute).roles.cache.get(MuteROle.id)
        ) {
          try{
            message.guild.member(UserToMute).roles.remove(MuteROle);
            message.channel.send(Mentionsome2);
          }catch(er){
            message.channel.send(`Something went wrong.. "${er}"`)
          }
         
        }
      }
    } else message.channel.send(Permission2);
  },
};
