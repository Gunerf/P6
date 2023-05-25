const express = require('express');
const mongoose = require('mongoose')

const app = express();
const userRoutes = require('./routes/user')
app.use(express.json())

//Mongoose connect 

mongoose.connect('mongodb+srv://schwerdtlenicolas:3O78FfcGfgXfXtDy@cluster0.lgc4egv.mongodb.net/?retryWrites=true&w=majority',  
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Error CORS 'Cross Origin Resource Sharing'

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/auth', userRoutes)

module.exports = app;
