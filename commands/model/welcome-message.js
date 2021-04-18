const mongoose = require('mongoose')

const WelcomeMessageSchema = mongoose.Schema({
    guild: String,
    guildID: String,
    guildOwner: String,
    message: String,
    dm: String,
    embed: String
});

module.exports = mongoose.model('welcome-message', WelcomeMessageSchema)