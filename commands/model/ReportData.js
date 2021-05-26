const mongoose = require('mongoose')

const ProverPremium = mongoose.Schema({
  guildID: String,
  guildName: String,
  reportChannel: String,
  
});

module.exports = mongoose.model('reports', ProverPremium)