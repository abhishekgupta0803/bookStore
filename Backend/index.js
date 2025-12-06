const express = require("express");
const dotenv = require("dotenv");
const port = process.env.PORT || 4000;
const bookRoute = require("./routes/bookRoute");
const userRoute = require("./routes/userRoute");
const cors = require("cors");
const app = express();
dotenv.config();



// CORS configuration
// Allow frontend URL from environment variable, or allow all origins in development
const allowedOrigins = process.env.FRONTEND_URL 
  ? [process.env.FRONTEND_URL] 
  : ['http://localhost:5173', 'http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In development, allow all origins
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // In production, check against allowed origins
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // If FRONTEND_URL is not set, allow all (fallback for easier deployment)
      if (!process.env.FRONTEND_URL) {
        console.warn('WARNING: FRONTEND_URL not set, allowing all origins');
        return callback(null, true);
      }
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('server is working');
});

const mongoose = require("mongoose");
// connect mongodb
const URI = process.env.MONGODBURI || process.env.LOCALURI;
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(`${URI}`);
}


app.use("/book", bookRoute);
app.use("/user", userRoute);

// Export app for Vercel serverless functions
module.exports = app;

// Only listen on port if not in Vercel environment
// Vercel will handle the serverless function execution
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}
