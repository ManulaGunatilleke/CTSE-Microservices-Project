const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const connectToDatabase = require('./config/database');
const { authenticate } = require("./middleware/authMiddleware");
const helmet = require("helmet"); // use helmet package for secure csp policy
const MongoStore = require('connect-mongo'); 
// const passport = require("passport");
//const cookieSession = require("cookie-session");
const session = require('express-session');
// const passportStrategy = require("./passport");
const cors = require("cors");

app.use(
	cors({
		origin: "http://a70714adea18c40339e551c24252cf47-34542496.ap-southeast-1.elb.amazonaws.com:3000/",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);


// Session configuration with MongoDB store
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_fallback_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: process.env.NODE_ENV === "production" ? true : false, // Set true for HTTPS in production
      httpOnly: true, // Make cookies accessible only by the web server
      maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds (adjust as needed)
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL, // MongoDB URL for session storage
      ttl: 1 * 24 * 60 * 60 // 14 days session expiration time
    })
  })
);
  
// Initialize Passport and session handling
// app.use(passport.initialize());
// app.use(passport.session());


//Initializing the port number
const PORT = process.env.PORT || 3001;

// Disable "X-Powered-By" header
app.disable("X-Powered-By");

// Cross-Domain Misconfiguration
app.use(cors({
  origin: 'http://a70714adea18c40339e551c24252cf47-34542496.ap-southeast-1.elb.amazonaws.com:3000/',
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

//database and server connection
connectToDatabase(process.env.MONGODB_URL);

app.listen(PORT, () => {
    console.log(`server is up and running on port number: ${PORT}`)
})

// auth routes
const authRouter = require('./routes/authRoutes');
app.use('/auth',authRouter);

// admin routes
const adminRouter = require('./routes/adminRoutes');
app.use('/admin', adminRouter);

// student routes
const studentRouter = require('./routes/studentRoutes');
app.use('/student', authenticate, studentRouter);

// instructor routes
const instructorRouter = require('./routes/instructorRoutes');
app.use('/instructor', authenticate, instructorRouter);

// role based authenticate
const authenticateRole = require('./routes/authenticateRole');
app.use('/authenticate-role', authenticateRole);

// auth routes
// const googleauthRouter = require('./routes/googleRoutes');
// app.use('/google-auth',googleauthRouter);