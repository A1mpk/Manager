const mongoose = require('mongoose');
const Guild = require('../commands/model/guild');
const guild = require('../commands/model/guild');
const Discord = require('discord.js');


module.exports = async (client, guild) => {
    guild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: guild.id,
        guildName: guild.name,
        prefix: String
    });
const JoinedEmbedf = new Discord.MessageEmbed()
.setAuthor('Manager')
.setDescription('Hello, thanks for invite me! It means a lot to us. To start off few things here, please run /help to receive a list of all the avaible commands.','If you need support you can always join our support server - https://discord.gg/qygy59P')
    guild.save()
    .then(result => console.log(result))
    .catch( err => console.error(err));

    console.log(`I have joined a guild.`)
    message.channel.send(`${guild}`)
   
};