const mongoose = require('mongoose')

const RoleSchema = mongoose.Schema({

roleName: String,
desctiption: String
});

module.exports = mongoose.model('role-descs', RoleSchema)