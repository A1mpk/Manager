const mongoose = require('mongoose')

const LevelsSchema = mongoose.Schema({
     levels: String,
     guildID: String,
     guildName: String
   
});

module.exports = mongoose.model('levels-disable', LevelsSchema)