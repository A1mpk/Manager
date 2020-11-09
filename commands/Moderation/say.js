const Discord = require('discord.js');
module.exports = {
    name: 'say',
    description: "Say command.",
    execute(message, args){
        let args2 = message.content.slice("4")
        const everyone = "@everyone"
        const say = new Discord.MessageEmbed()
        .setAuthor('SAY - FUN')
        .setDescription('Deletes your message and sents the same message as the bots message.')
        .setTimestamp()
        .addField("USAGE : `say <message>`", "** **")
        .setColor(3066993)
      if(!args2){
          message.channel.send(say)
      };
      let blacklisted = ['nigga','nigger','cunt','faggot','retard','retarded','retarted','hoe','whore','bitch','fuck','ass',] //words


      let foundInText = false;
      for (var i in blacklisted) { 
        if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
      }
      if(message.author.id === "368148684468387840"){
        console.log(`Founder`)
        console.clear()
    }else
    if(message.author.id === "503186950295912458"){
        console.log(`Co-Founder`)
        console.clear()
    }else
    if(message.author.id === "508728576183369760"){
      console.log(`Co-Founder`)
      console.clear()
  }else
  if(message.author.id === "375404524019384322"){
    console.log(`Co-Founder`)
    console.clear()
}else
if(message.author.id === "420380500918665239"){
  console.log(`Co-Founder`)
  console.clear()
}
if(message.author.id === "221763133994172419"){
  console.log(`Co-Founder`)
  console.clear()
  }else

        if (foundInText) {
          message.delete();
          console.clear()
      }else

      

      if(args2){
          message.delete()
          message.channel.send(args2)
      };
     

 
}

};