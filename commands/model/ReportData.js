const mongoose = require('mongoose')

const MintPremium = mongoose.Schema({
  guildID: String,
  guildName: String,
  reportChannel: String,
  
});

module.exports = mongoose.model('reports', MintPremium)