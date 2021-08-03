const Discord = require("discord.js");

module.exports = {
  name: "role_description",
  description: "Roles desctiption",
  disabled: false,
  async execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );

    const RoleIdentify = message.mentions.roles.first();
    if (!RoleIdentify){
      const ErrorMessage = new Discord.MessageEmbed()
      .setTitle('An error occured...')
      .setDescription(`You forgot to mention which role you wanna see the description of!`)
      .setColor('#339295')
      .setFooter('Category - Configs')
      message.channel.send('**Tip:** To find out the usage of this command, you can run our help command.', ErrorMessage)
      return undefined
    }
    // FETCHING DATA
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
      }else

      CacheofRoles[RoleIdentify] = Data = [Result.roleName, Result.desctiption];
    }
    // ACTUAL COMMAND
    const ConvertingRoleIntoName = message.guild.roles.cache.find(
      (rl) => Data[0] === rl.id
    );
    const TestedEmbed = new Discord.MessageEmbed()
      .setTitle(`Description of ${ConvertingRoleIntoName.name}!`)
      .setDescription(Data[1])
      .setColor("#339295")

    message.channel.send(TestedEmbed);
  },
};
