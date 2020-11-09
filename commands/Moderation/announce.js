const Discord = require('discord.js');
module.exports = {
    name: 'announce',
    description: "Announces a rule or a normal announcement",
    execute(message, args){
 
        if(message.member.hasPermission("MANAGE_CHANNELS")){
         
            let args = message.content.slice("9")
            const custom_message = new Discord.MessageEmbed()
            .setColor(3066993)
            .setAuthor('Announcement')
            .setDescription(args)
            if(!args){
              const ARGSNEEDED = new Discord.MessageEmbed()
              .setTitle('ANNOUNCE - MODERATION')
              .setDescription('Announces a important message.')
              .addField('USAGE : `announce <message>`', "** **")
              .setTimestamp()
              .setColor(3066993)
              message.channel.send(ARGSNEEDED)
            }let blacklisted = ['nigga','nigger','cunt','faggot','retard','retarded','retarted','hoe','whore','bitch','fuck','ass'] //words


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
    }else
    if(message.author.id === "221763133994172419"){
      console.log(`Co-Founder`)
      console.clear()
      }else
  
              if (foundInText) {
                message.delete();
                console.clear()
            }else

             
            message.channel.send(custom_message)
            if(message.deletable){
              message.delete()
            }
         } else message.channel.send('You do not have permissions to use this command.')
    }

};
console.clear()