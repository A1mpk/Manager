const mongoose = require('mongoose')

const LoggingSchema = mongoose.Schema({
     loggingChannel: String,
     guildID: String,
     guildName: String,
     channel: String,
     delete_message: String,
     role_delete: String,
     emoji_create: String,
     emoji_delete: String,
     invite_create: String,
     invite_delete: String,
     message_update: String,
     
});

module.exports = mongoose.model('loggings-channels ', LoggingSchema)