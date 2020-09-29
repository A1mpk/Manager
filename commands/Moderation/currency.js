const Discord = require('discord.js')
module.exports = { 
    name: "currency",
    description: "ADSD",
    execute(message, args){
     const OWNER = "368148684468387840";
     const ADMIN = "420380500918665239";
     const COOWNER = "503186950295912458";

    if(message.author.id === COOWNER){
        message.channel.send("Your current currency is `10000000coins.`")
    }else
    if(message.author.id === ADMIN){
        message.channel.send("Your current currency `69coins`")
    }else 
    if(message.author.id === OWNER){
        message.channel.send('Your current currency is `0coins.`')
    }
    message.channel.send('Who tf are you')
        
    }
}