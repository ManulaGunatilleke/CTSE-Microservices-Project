const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const helmet = require("helmet"); // use helmet package for secure csp policy

const databaseConnection = require('./config/database.js');
const cors = require("cors");

//Initializing the port number
const PORT = process.env.PORT || 3004;

// Disable "X-Powered-By" header
app.disable("X-Powered-By");

// Cross-Domain Misconfiguration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());
app.use(express.json());

app.use(helmet()); // use helmet package for enable various security policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    }
  })
) // use a csp policy for this express app

// Define your Content Security Policy
const cspOptions = {
    directives: {
      defaultSrc: ["'self'", "'trusted-default.com'"],  
      scriptSrc: ["'self'", 'https://cdnjs.cloudflare.com', 'https://ajax.googleapis.com', 'https://code.jquery.com'],  
      styleSrc: ["'self'",'https://fonts.googleapis.com', 'https://stackpath.bootstrapcdn.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://use.fontawesome.com'],
      imgSrc: ["'self'", "data:", 'https://images.unsplash.com'],  
      connectSrc: ["'self'", 'https://api.mybackend.com', 'https://www.googleapis.com'],  
      upgradeInsecureRequests: [],  
    },
  };
  
  app.use(helmet.contentSecurityPolicy(cspOptions));
  
// Set X-Frame option header to DENY
app.use((req, res, next) => {
    res.setHeader('X-Frame-Options','DENY');
    next();
  })
  
//securing database connection
databaseConnection(process.env.MONGODB_URL);

app.listen(PORT, () => {
    console.log(`Enrolment Service Server is up and running on port number: ${PORT}`)
})

//implementation of the the course route
const enrollmentRouter = require("./routes/enrollment.js");
app.use("/enrollment", enrollmentRouter);
