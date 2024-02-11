const mongoose = require('mongoose')

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, {appName: 'simbiotik-api'})
  .then((d) => console.log('MongoDB: Connected Successfully'))
  .catch((err) => console.error('MongoDB: Failed to connect', err))


module.exports = mongoose;