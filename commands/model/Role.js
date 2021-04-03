const mongoose = require('mongoose')

const Role = mongoose.Schema({
    guild: String,
    guildID: String,
    description: String,
  role: String,
  
   
});

module.exports = mongoose.model('roles-desc', Role)