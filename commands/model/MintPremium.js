const mongoose = require('mongoose')

const MintyPremium = mongoose.Schema({
    MintyPremium: String,
    guildID: String,
    guild: String,
    Owner: String,
    messageCreatedAt:String,
    channelID:String,
    by:String,
});

module.exports = mongoose.model('MintyPremium', MintyPremium)