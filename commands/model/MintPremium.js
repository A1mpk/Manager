const mongoose = require('mongoose')

const ProverPremium = mongoose.Schema({
    ProverPremium: String,
    guildID: String,
    guild: String,
    Owner: String,
    messageCreatedAt:String,
    channelID:String,
    by:String,
});

module.exports = mongoose.model('ProverPremium', ProverPremium)