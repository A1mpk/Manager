const Discord = require("discord.js");
module.exports = {
  name: "mute",
  description: "Mute member",
  disabled: false,
  execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );
      const Permission = new Discord.MessageEmbed()
      .setTitle('I need permissions!')
      .setDescription('Im missing ``**MANAGE_ROLES**`` permissions!')
      .setColor('#339295')
      const SameLevel = new Discord.MessageEmbed()
      .setTitle('Cant mute em')
      .setDescription('You cant mute them since they have the same permissions as you!')
      .setColor('#339295')
      const Again = new Discord.MessageEmbed()
      .setTitle('That person is already muted...')
      .setDescription('Really trying to mute someone who is already muted?')
      .setColor('#339295')
      const Permission2 = new Discord.MessageEmbed()
      .setTitle('You need permissions!')
      .setDescription('You\'re missing ``**MANAGE_ROLES**`` permissions!')
      .setColor('#339295')
      const Mentionsome = new Discord.MessageEmbed()
      .setDescription('You need to create an role called Muted and remove permission to send messages.')
      .setTitle('Missing Role: Muted')
      .setColor('#339295')
    
    if (!message.guild.me.hasPermission(["MANAGE_ROLES"])){
       message.channel.send(Permission)
       return undefined
    }
    const channels = message.guild.channels.cache.filter(
      (ch) => ch.type !== "text-channels"
    );
    // CHECKING IF MUTE ROLE FOUND WORKS
    if (message.member.hasPermission(["MANAGE_ROLES"])) {
      const MuteROle = message.guild.roles.cache.find(
        (Role) => Role.name === "Muted"
      );
      if (!MuteROle) {
       
      message.channel.send(Mentionsome)
      return undefined
      }
      // Reasons for mute (not needed?) WORKS
      const Reason = message.content.slice(28);
      // Add the mute command to the G
      const UserToMute = message.mentions.users.first();
      if(!UserToMute){
        const Mentionsome = new Discord.MessageEmbed()
        .setDescription('You need to mention a user to mute.')
        .setTitle('Who are you muting?')
        .setColor('#339295')
      message.channel.send(Mentionsome)
      return undefined
      }
      if (message.guild.member(UserToMute).roles.cache.get(MuteROle.id)) {
        message.channel.send(Again);
      } else if (
        message.guild
          .member(UserToMute)
          .hasPermission(["MUTE_MEMBERS", "ADMINISTRATOR"])
      ) {
        message.channel.send(SameLevel);
        return undefined
      } else if (
        !message.guild
          .member(UserToMute)
          .hasPermission(["ADMINISTRATOR", "MUTE_MEMBERS"])
      ) {
        message.guild.member(UserToMute).roles.add(MuteROle);
    
        const Success = new Discord.MessageEmbed()
        .setTitle('Muted them..')
        .setDescription(`Sucessfully muted ${UserToMute.tag} for ${Reason|| "No reason given."}`)
        .setColor("#339295")
        message.channel.send(Success)
        return undefined
      }
    } else message.channel.send(Permission2); // WORKS
  },
};
