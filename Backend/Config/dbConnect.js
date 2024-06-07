





const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false); 
// Load environment variables from .env fil
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


  /* /Import the MongoDB Node.js driver
 import Mongoose
const _database = 'mongodb://root:password@mongo-backend:27017/PFE?authSource=admin';
mongoose.connect(_database, {
  useNewUrlParser: true
})
  .then(() => console.log('Connected to MongoDB ...'))
  .catch(err => console.error('Could not connect to MongoDB:‌', err));
 */




