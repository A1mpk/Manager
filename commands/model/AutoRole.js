const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const AutoRoleSchema = mongoose.Schema({
 _id: reqString,
 guildName: reqString,
 autorole: reqString
})

module.exports = mongoose.model('autoroles', AutoRoleSchema)