// Import required packages
const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path'); 

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Set the port (fallback to 4000 if not provided)
const port = process.env.PORT || 4000;

// Middleware for security headers
app.use(helmet());

// Middleware for logging HTTP requests
app.use(morgan('common'));

// Middleware to parse JSON request bodies
app.use(express.json());

// Rate Limiting: prevent too many requests from the same IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Maximum number of requests per IP
    message: "Too many requests from this IP, please try again later."
});

app.use(limiter);

// Serve public static files
app.use(express.static(path.join(__dirname, 'public')));

// Example route
app.get('/', (req, res) => {
    res.send("Server is running securely with Express!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
