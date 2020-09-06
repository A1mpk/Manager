const mongoose = require('mongoose');
const Guild = require('../commands/model/guild');
const guild = require('../commands/model/guild');

module.exports = async (client, guild) => {
    Guild.findOneAndDelete({
        guildID: guild.id
    }, (err, res) => {
        if(err) console.error(err)
        console.log('I have been removed/banned from a server.');
    });
}