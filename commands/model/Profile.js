const mongoose = require('mongoose')

const RankCard = mongoose.Schema({
     guildID: String,
     guildName: String,
     RealUser: String,
     username: String,
     background: String,
     textColor: String,
     
   
});

module.exports = mongoose.model('RankCard', RankCard)