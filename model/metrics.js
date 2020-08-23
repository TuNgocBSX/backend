const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MetricSchema = new Schema({
    num: { type: Number , unique: true},
    percent: Number, 
    day: Number
})


module.exports = mongoose.model('Metrics', MetricSchema)