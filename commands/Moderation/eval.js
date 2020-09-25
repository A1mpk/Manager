const Discord = require('discord.js');

module.exports = {
    name: 'eval',
    description: "EVALS A MESSAGE",
    execute(message, args){
        const ownerID = ("368148684468387840")
        const NotOWNER = new Discord.MessageEmbed()
        .setColor(16580705)
        .setAuthor('ERROR')
        .setDescription('You do not own this bot.:no_entry_sign:')
          if(message.author.id !== ownerID) return message.channel.send(NotOWNER)
          try {
            const code = args.join(" ");
            let evaled = eval(code);
      
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
      
            message.channel.send((evaled), {code:"xl"});
          } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${(err)}\n\`\`\``);
          }
    }
        
};