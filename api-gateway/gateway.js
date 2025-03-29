const express = require("express");
const proxy = require("express-http-proxy")
const cors = require("cors");

const app = express();

const corsOption = {
    origin: "*",
}

app.use(cors(corsOption));
app.use(express.json());

// Set up CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Proxy requests to different service
app.use("/UserManagementService", proxy("http://localhost:3001"));
app.use("/CourseManagementService", proxy("http://localhost:3002"));
app.use("/PaymentManagementService", proxy("http://localhost:3003"));
app.use("/EnrollmentManagementService", proxy("http://localhost:3004"));

// Start the API Gateway
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Gateway is Listening to Port ${PORT}`);
});
