const Discord = require('discord.js');
module.exports = {
    name: 'say',
    description: "Say command.",
    execute(message, args){
        let args2 = message.content.slice("4")
        const everyone = "@everyone"
        const say = new Discord.MessageEmbed()
        .setAuthor('SAY COMMAND -')
        .setDescription('The correct usage of this command is `/say your message`.')
        .setColor(15105570)
      if(!args2){
          message.channel.send(say)
      };
      if(message.content === "/say @everyone"){
          message.channel.send("Here take a cookie with milk.🍪🥛");
      } else 

      

      if(args2){
          message.delete()
          message.channel.send(args2)
      };
     

 
}

};