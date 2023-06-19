const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        unique: true,
        validate:{
            validator: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Veuillez saisir une adresse e-mail valide."
        }
    },
    password: {type: String, required: true}
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)