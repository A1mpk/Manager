const Discord = require('discord.js');

module.exports = {
    name: 'dogwater',
    description: "Literally dog meters you",
    disabled: false,
    execute(message, args){
        const randomXp = Math.floor(Math.random() * 100) + 1 
        const user = message.mentions.users.first() || message.author;
        if(!user)return message.channel.send(`Oops... You forgot to mention a user!`)
        message.channel.send(`${user} is ${randomXp}% literal dogwater!`)
    }

};