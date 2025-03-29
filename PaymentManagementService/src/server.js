const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const helmet = require("helmet"); // use helmet package for secure csp policy

const port = process.env.PORT || 3003;

// Disable "X-Powered-By" header
app.disable("X-Powered-By");

// app middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// app.use(bodyParser.json());
app.use(express.json())

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

//database connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL).then(() => {
    app.listen(port, () => {
        console.log(`server is up and running on port number ${port}`)
    })
}).catch((error) => {
    console.log(error)
})


const checkoutRoutes = require("./routes/checkoutRoutes");
app.use('/checkout', checkoutRoutes);

const paymentRoutes = require("./routes/paymentRoutes");
app.use('/payment', paymentRoutes);



