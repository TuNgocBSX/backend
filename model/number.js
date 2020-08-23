const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NumberChema = new Schema({
    num: { type: Number , unique: true},
    class_a: Number, 
    class_b: Number,
    class_c: Number,
    class_d: Number,
    class_e: Number,
    created_at: {type: Date , default:Date.now()},
    updated_at: {type: Date , default:Date.now()},
    is_active: {type: Boolean},
    is_old: {type: Boolean},
})


module.exports = mongoose.model('Number', NumberChema)