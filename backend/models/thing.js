const mongoose = require('mongoose')

const thingSchema = mongoose.Schema({
    userId: {type :String, required: true},
    name: {type :String, required: true},
    manufacturer: {type :String, required: true},
    description: {type :String, required: true},
    mainPepper: {type :String, required: true},
    imageUrl: {type :String},
    heat: {type: Number, min:0, max:10},
    likes: {type: Number, default: 0},
    dislikes: {type: Number , default: 0},
    usersLiked: {type :[String], default: []},
    usersDisliked: {type :[String], default: []},
})

module.exports = mongoose.model('Thing', thingSchema)