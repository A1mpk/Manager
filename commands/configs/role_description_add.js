const Discord = require("discord.js");
const client = new Discord.Client();
module.exports = {
  name: "role_description_add",
  description: "Roles desctiption",
  disabled: false,
  async execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );

    // CHECKING FOR PERMISSIONS
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")){
      const Permission = new Discord.MessageEmbed()
      .setTitle('I need permissions!')
      .setDescription('I\'m missing ``**MANAGE_CHANNELS**`` permissions!')
      .setColor('#339295')
      message.channel.send(Permission)
    }
      
    if (!message.member.hasPermission("MANAGE_CHANNELS")){
      const Permission = new Discord.MessageEmbed()
      .setTitle('You need permissions!')
      .setDescription('You\'re missing ``**MANAGE_CHANNELS**`` permissions!')
      .setColor('#339295')
      message.channel.send(Permission)
    }

    // CHECKING FOR STUFF LIKE ARGUMENTS, ROLE MENTIONS & ROLES-DESCRIPTION.
 
    const Arguments = message.content.slice(`45`);
    const RoleIdentify = message.mentions.roles.first();
   
    if (!RoleIdentify){
      const ErrorMessage = new Discord.MessageEmbed()
      .setTitle('An error occured...')
      .setDescription(`You forgot to mention the role!`)
      .setColor('#339295')
      .setFooter('Category - Configs')
      message.channel.send('**Tip:** To find out the usage of this command, you can run our help command.', ErrorMessage)
      return undefined
    }else
    if (!Arguments){
      const ErrorMessage = new Discord.MessageEmbed()
      .setTitle('An error occured...')
      .setFooter('Category - Configs')
      .setDescription(`You forgot to mention the role and include your description of that specific role.`)
      .setColor('#339295')
      message.channel.send(ErrorMessage)
     return undefined

    }
    const Role = message.guild.roles.cache.find(
      (role) => RoleIdentify === role
    );
    if (!Role) {
      const ErrorMessage = new Discord.MessageEmbed()
      .setTitle('An error occured...')
      .setDescription(`That isn't an role lol..`)
      .setColor('#339295')
      message.channel.send(ErrorMessage)
      return undefined
    }

    const FileOf = require("../model/RoleSchema");

    try {
      try {
        await FileOf.findOneAndUpdate(
          {
            roleName: Role.id,
          },
          {
            roleName: Role.id,
            desctiption: Arguments,
          },
          {
            upsert: true,
          }
        );

        const TestedEmbed = new Discord.MessageEmbed()
          .setTitle(`Description of ${Role.name}`)
          .setDescription(Arguments)
          .setColor("#339295")
          .setTimestamp();

        message.channel.send(TestedEmbed);
      } catch (er) {
        return message.channel.send(er);
      }
    } catch (er) {
      message.channel.send(er);
    }
  },
};
