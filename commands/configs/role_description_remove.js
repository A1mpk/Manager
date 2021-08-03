const Discord = require("discord.js");

module.exports = {
  name: "role_description_remove",
  description: "Roles desctiption",
  disabled: false,
  async execute(message, args) {
    const RoleSchema = require("../model/RoleSchema");
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );
      if (!message.member.hasPermission("MANAGE_ROLES")){
        const Permission = new Discord.MessageEmbed()
  .setTitle('You need permissions!')
  .setDescription('You\'re missing ``**MANAGE_ROLES**`` permissions!')
  .setColor('#339295')
  message.channel.send(Permission)
      }
    const RoleIdentify = message.mentions.roles.first();
    if (!RoleIdentify){
      const ErrorMessage = new Discord.MessageEmbed()
      .setTitle('An error occured...')
      .setDescription(`You forgot to mention the role you wanted to remove!`)
      .setColor('#339295')
      .setFooter('Category - Configs')
      message.channel.send('**Tip:** To find out the usage of this command, you can run our help command.', ErrorMessage)
      return undefined
    }

    // FETCHING DATA
    try {
      const RoleSchema = require("../model/RoleSchema");
    const CacheofRoles = {};
    let Data = CacheofRoles[RoleIdentify];

    if (!Data) {
      const Result = await RoleSchema.findOne({ roleName: RoleIdentify.id });
      if (!Result){
        const NoRole = new Discord.MessageEmbed()
        .setTitle(`Not found.`)
        .setDescription(`This role **never** had a description!`)
        .setColor('#339295')
        .setFooter('Category - Configs')
        message.channel.send('**Tip:** You can set a description for a role by using >role_description_add command.',NoRole)
      }
      else
      try {
        await RoleSchema.findOneAndDelete({
          roleName: RoleIdentify.id,
        });
        const DeletedTheSR = new Discord.MessageEmbed()
        .setTitle(`Finally deleted the role..`)
        .setDescription(`Hey! I deleted the ${RoleIdentify.name}'s description!`)
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
