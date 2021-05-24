const mongoose = require('mongoose')

const MintyPremium = mongoose.Schema({
  guildID: String,
  guildName: String,
  reportChannel: String,
  
});

module.exports = mongoose.model('reports', MintyPremium)