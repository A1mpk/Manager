const Discord = require('discord.js')
module.exports = {
    name: 'help',
    description: "HELP COMMAND ",
    execute(message, args){
        const Help = new Discord.MessageEmbed()
        .setAuthor('Help')
        .setColor("RED")
        .setDescription('Hey, im Dreamy a bot made by Dream#3076. So you wonder what can i do right? If so i can do some basic commands such as :```clear,ban,kick,announce,play,slowmode,verify and others!```')
        .addField('Moderation Commands', "**>help moderation**")
        const ModerationEmbed = new Discord.MessageEmbed()
        .setAuthor('Moderation Commands')
        .addField('ban', 'This command is used to ban the mentionned user.')
        .addField('kick','This command is used for kicking the mentionned user.')
        .addField('mute', 'This command can mute a person **forever** however you can always unmute them from our command "unmute @user"')
        .addField("tempmute", 'This command will mute a person for a certain amount of time.')
        .addField('giverole', 'This command will give the mentionned role to the person(Ex : >giverole @user')
        .addField('warn', 'This command will warn the mentionned user, however if they get 3 warns they will be kicked from the group.')
        .addField('roleinfo', 'This command will give some informations about the mentionned role.')
        .setColor("BLUE")
        const Helpars = message.content.slice(5)
        if(Helpars.match("moderation")){
            message.author.send(ModerationEmbed)
            message.channel.send("Check your DMS!")
        }else
        if(!Helpars){
            message.author.send(Help)
        }
        
            
        }
    
    }