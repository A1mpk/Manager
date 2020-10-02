const Discord = require('discord.js');

module.exports = {
    name: 'eval',
    description: "Eval",
    execute(message, args){
        const OWNERID = "368148684468387840"
        const AK = new Discord.MessageEmbed()
        .setAuthor('ERROR')
        .setDescription('You do not own the bot.')
        .setColor(15105570)
        if(message.author.id !== OWNERID) return message.channel.send(AK)
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
