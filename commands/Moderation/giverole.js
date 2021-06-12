const Discord = require("discord.js");
module.exports = {
  name: "giverole",
  description: "Give role comand.",
  disabled: true,
  execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );

    // Checking if they sent the role name after the @ WORKS
    if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      return message.channel.send(
        "I don`\t have enough permissions [`MANAGE_ROLES`]"
      );
    try {
      if (message.member.hasPermission(["MANAGE_ROLES"])) {
        const Rolename = message.content.slice(33);
        console.log(Rolename);
        if (!Rolename) {
          message.channel.send(`Please write a reason for this action.`);
        }
        // Looking for member WORKS
        const GiveRoleMember = message.mentions.members.first();
        if (!GiveRoleMember)
          return message.channel.send(
            `Please mention a user to give the role to.`
          );
        // Looking for role
        const GiveRole = message.guild.roles.cache.find(
          (role) => Rolename === role.name
        );
        if (GiveRole) {
          if (message.guild.member(GiveRoleMember).roles.cache.get(GiveRole.id))
            return message.channel.send(`That member already has that role.`);
          message.channel.send(
            `I have given ${GiveRoleMember.user.tag} the ${Rolename} role!`
          );
          GiveRoleMember.roles.add(GiveRole);
        } else if (!GiveRole) {
          message.channel.send(`I cannot find the role "${Rolename}".`);
        }
      } else
        message.channel.send(
          `You are not permitted to run this command due to the roles you currently have.`
        );
    } catch (er) {
      message.channel.send(
        `Something went wrong! Here are the possibles : Permission needed (role to high). How To Fix : Make the bot's role higher than the chosen role.`
      );
    }
  },
};
