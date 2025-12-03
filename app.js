// Dependencies
const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");

// Load .env
dotenv.config();

// App init
const app = express();

// Security Middlewares
app.use(helmet());                   // Secure headers
app.use(cors());                     // Avoid CORS blocking
app.use(mongoSanitize());            // Prevent NoSQL injection

// Logging
app.use(morgan("dev"));

// Body parser
app.use(express.json());

// Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 200,
    message: "Too many requests, try again later.",
  })
);

// Public folder (optional for simple chat UI)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Chat backend running securely!");
});


// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Secure chat server running on port ${port}`);
});
