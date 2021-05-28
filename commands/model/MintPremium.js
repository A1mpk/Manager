const mongoose = require('mongoose')

const MintPremium = mongoose.Schema({
    MintPremium: String,
    guildID: String,
    guild: String,
    Owner: String,
    messageCreatedAt:String,
    channelID:String,
    by:String,
});

module.exports = mongoose.model('MintPremium', MintPremium)