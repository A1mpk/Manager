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
    if (!message.guild.me.hasPermission(["MANAGE_ROLES"]))
      return message.channel.send(
        "I don't have enough permissions to ban a user. [`MANAGE_ROLES`]"
      );

    const MuteROle = message.guild.roles.cache.find(
      (Role) => Role.name === "Muted"
    );
    const UserToMute = message.mentions.users.first();
    const Reason = message.content.slice(30);
    // CHECKING IF MUTE ROLE FOUND WORKS

    // Reasons for mute (not needed?) WORKS
    if (message.member.hasPermission(["MANAGE_ROLES"])) {
      if (!Reason) return message.channel.send(`Reason was not included.`);
      console.log(Reason);
      // Add the mute command to the G

      if (!UserToMute)
        return message.channel.send(`Make sure to mention someone!`);
      if (Reason) {
        if (!message.guild.member(UserToMute).roles.cache.get(MuteROle.id)) {
          message.channel.send(`That user is already unmuted!`);
        } else if (
          message.guild.member(UserToMute).roles.cache.get(MuteROle.id)
        ) {
          message.guild.member(UserToMute).roles.remove(MuteROle);
          message.channel.send(
            `I have unmuted ${UserToMute.tag} for ${Reason}.`
          );
        }
      }
    } else
      message.channel.send(
        `You are not permitted to run this command due to the roles you currently have.`
      ); // WORKS
  },
};
