const express = require("express");
const app = express();
const routes = require("./routes");
const ExpressError = require("./ExpressError");

//to be able to use req.body, without this, we cannot see req.body
app.use(express.json());
//items prefix
app.use("/items", routes);


//for 404 errors
app.use(function (req, res, next) {
    return new ExpressError("not Found", 404);
})

//for generic 404s
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
        Error: err.message,
    })
})


module.exports = app;
