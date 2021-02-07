const mongoose = require('mongoose')

const YoutubeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String
   
});

module.exports = mongoose.model('youtube-notif', YoutubeSchema, 'youtube-notif')