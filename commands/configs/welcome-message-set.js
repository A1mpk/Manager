const Discord = require("discord.js");
const WelcomeMessageSchema = require("../model/welcome-message");
module.exports = {
  name: "welcome-message-set",
  description: "Welcome message when someone joins",
  disabled: false,
  async execute(message, args) {
    const ANswer = message.content.slice(20);
    if (!message.member.hasPermission("ADMINISTRATOR")){
      const Permission = new Discord.MessageEmbed()
      .setTitle('You need permissions!')
      .setDescription('You\'re missing ``**ADMINISTRATOR**`` permissions!')
      .setColor('#339295')
      message.channel.send(Permission)
    }
    if (!ANswer) {
      const ErrorMessage = new Discord.MessageEmbed()
      .setTitle('Uhhhh...')
      .setDescription(`You forgot to enter your welcome message!`)
      .setColor('#339295')
      .setFooter('Category - Configs')
      message.channel.send('**Tip:** To find out the usage of this command, you can run our help command.', ErrorMessage)
    
    } else
      try {
        try {
          await WelcomeMessageSchema.findOneAndUpdate(
            {
              guildID: message.guild.id,
            },
            {
              guild: message.guild.name,
              guildID: message.guild.id,
              guildOwner: message.guild.owner,
              message: ANswer,
            },
            {
              upsert: true,
            }
          );
         const OkDid = new Discord.MessageEmbed()
         .setTitle(`Here's your message;`)
         .setDescription(ANswer)
         .setColor('#339295')
         .setFooter('With Update 2.2, you can customize more!')
         message.channel.send(OkDid)
        } catch (er) {
          return message.channel.send(er);
        }
      } catch (er) {
        message.channel.send(er);
      }
  },
};
