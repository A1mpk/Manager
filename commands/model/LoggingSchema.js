const mongoose = require('mongoose')

const LoggingSchema = mongoose.Schema({
     loggingChannel: String,
     guildID: String,
     guildName: String,
     channel: String
   
});

module.exports = mongoose.model('loggings-channels ', LoggingSchema)