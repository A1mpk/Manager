const mongoose = require('mongoose')

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    channelID: String,
    serverChannelID: String
   
});

module.exports = mongoose.model('youtube-notification', guildSchema, 'youtube-notification')