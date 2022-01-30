const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    guildId: { type: String, unique: true },
    roles: { type: Array }
});

const model = mongoose.model('autoroles', schema)

module.exports = model;
// Layer Coding : !                  Marquis#9999
