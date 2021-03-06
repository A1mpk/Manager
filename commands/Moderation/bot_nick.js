const Discord = require('discord.js');
module.exports = {
    name: 'bot_nick',
    description: "Nicks the message.member.userSetNickname(lol)",
    disabled: false,
    execute(message, args, client){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        if(!message.guild.me.hasPermission('SEND_MESSAGES'))return;
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS'))return;
        if(!message.guild.me.hasPermission("VIEW_CHANNEL"))return;
        const lol = message.content.slice(9)
        const LOL = new Discord.MessageEmbed()
        .setColor(3447003)
        .setAuthor('BOT_NICK - MODERATION')
        .setDescription('`>bot_nick <nickname>` - This is just a bot_nick command, it will change the nickname of the [bot](https://discord.com/api/oauth2/authorize?client_id=725787532008095744&permissions=8&scope=bot).')
        .setTimestamp()
        if(!message.guild.me.hasPermission(['MANAGE_NICKNAMES']))return message.channel.send('I don\`t have enough permissions. [`MANAGE_NICKNAMES]')
        try{
            if(message.member.hasPermission('ADMINISTRATOR')){
                if(!lol){
                 message.channel.send(LOL)
             }
             if(lol){
                 if(lol.length >32) return message.channel.send(`My nickname has more than 32characters, 32 is the max!`)
                 if(lol.length <32){
                    message.guild.me.setNickname(lol)
                    message.channel.send(`My nickname is now **${lol}**.`)
                 }
             }
            }else message.channel.send('You need `ADMINISTRATOR` to use this command.')
        }catch(er){
            message.channel.send(`Something went wrong, please re-run this command.`)
        }
    
    }

};