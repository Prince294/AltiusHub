const express = require("express");
var app = express();
var session = require("express-session");

app.use(
    session({ resave: true, saveUninitialized: true, secret: "XCR3rsasa%RDHHH" })
);
const cors = require("cors");
const db = require("./app/models");
const cookieParser = require("cookie-parser");
require("dotenv").config("./.env");
const PORT = process.env.PORT;
const bearerToken = require("express-bearer-token");
app.use(cookieParser());

db.sequelize.sync({ force: false }).then(() => {
    console.log("re-sync db.");
});

var corsOptions = {
    // origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

app.use(
    bearerToken({
        headerKey: "Basic",
    })
);

require("./app/routes/api.routes")(app);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
