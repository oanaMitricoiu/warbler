const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose
    .connect("mongodb://127.0.0.1/warbler", {
        // keepAlive: true,
        // useMongoClient: true,
        useNewUrlParser: true,
    })
    .then(() => console.log("Mongoose connected!!!!"));

module.exports.User = require("./user");
module.exports.Message = require("./message");
