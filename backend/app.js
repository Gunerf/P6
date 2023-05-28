const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
const userRoutes = require('./routes/user')
const stuffRoutes = require('./routes/stuff')
app.use(express.json())

//Mongoose connect 

mongoose.connect('mongodb+srv://schwerdtlenicolas:3O78FfcGfgXfXtDy@cluster0.lgc4egv.mongodb.net/?retryWrites=true&w=majority',  
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Error CORS 'Cross Origin Resource Sharing'

app.use(cors())

app.use('/api/sauces', stuffRoutes)
app.use('/api/auth', userRoutes)


module.exports = app;
