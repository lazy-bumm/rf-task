const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const requestLoggerMiddleware = require('./loggerMiddleware');

var cors=require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

const usersCollection = db.collection('users');
var d;
const agg=async()=>{
 const data=await(usersCollection.find({}));
  d=await(data.toArray());
} 
agg();
// console.log(JSON.stringify(usersCollection))
app.use(cors());
// Middleware
app.use(requestLoggerMiddleware);
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
