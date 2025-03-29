const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
require("dotenv").config();
const helmet = require("helmet"); //helmet package for secure CSP Policy

// Allow requests from localhost:3000
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

const databaseConnection = require('./config/database');

//Initializing the port number
const PORT = process.env.PORT || 3002;

// Disable "X-Powered-By" header
app.disable("X-Powered-By");

app.use(bodyParser.json());
app.use(express.json());

app.use(helmet()); 

//using csp policy for the express app
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"]
        }
    })
)

// Defining CSP for the CSP Notices Vuln.
const cspOptions = {
    directives: {
        defaultSrc: ["'self'", "'trusted-default.com'"],
        scriptSrc: ["'self'",'https://cdnjs.cloudflare.com', 'https://ajax.googleapis.com', 'https://code.jquery.com'],
        styleSrc: ["'self'",'https://fonts.googleapis.com', 'https://stackpath.bootstrapcdn.com'],
        imgSrc: ["'self'", 'https://images.unsplash.com', 'data:'],
        fontSrc : ["'self'", 'https://fonts.gstatic.com', 'https://use.fontawesome.com'],
        connectSrc : ["'self'", 'https://api.mybackend.com', 'https://www.googleapis.com'],
        objectSrc : ["'none'"],
        frameSrc : ["'none'"],
        upgradeInsecureRequests: [],
    }
}
   
app.use(helmet.contentSecurityPolicy(cspOptions));
   
// Anti-Clickjacking header missing
// Set X-Frame option header to DENY
app.use((req, res, next) => {
    res.setHeader('X-Frame-Options','DENY');
    next();
  })

//securing database connection
databaseConnection(process.env.MONGODB_URL);

app.listen(PORT, () => {
    console.log(`Course Service Server is up and running on port number: ${PORT}`)
})

//implementation of the the course route
const courseRouter = require("./routes/courses");
app.use("/course", courseRouter);
