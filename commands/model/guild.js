const mongoose = require('mongoose')
const x = '>'
const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    prefix: String ,
    log: String
   
});

module.exports = mongoose.model('Guild', guildSchema, 'guilds')