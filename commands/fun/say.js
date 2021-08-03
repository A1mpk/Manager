const Discord = require("discord.js");  

module.exports = {
  name: "say",
  description: "Say command.",
  disabled: false,
  execute(message, args) {

 
    let args2 = message.content.slice(4);
    
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );

    const everyone = "@everyone";
    const say = new Discord.MessageEmbed()
      .setAuthor("What do you want me to say?")
      .setDescription(
        "Enter something you want me to say!"
      )
    


      .setColor("#339295");
    if (!args2) {
      message.channel.send(say);
    }else
    if(args2){
       const MEssage = new Discord.MessageEmbed()
     
      .setDescription(`"${args2}"`)
      .setColor("#339295")
      .setFooter(`From ${message.member.user.tag}`)
   
   
      message.channel.send(MEssage)
    }
  },
};
