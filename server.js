if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const { MONGODB_URL_LOCAL } = require('./config');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Connect MongoDB
mongoose.connect(MONGODB_URL_SERVER, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('Connected to MongoDB'));

// Routes
app.use('/api/auth', require('./routes/Users'));

// Run server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
