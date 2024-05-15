// require("dotenv").load();
require("dotenv").config();

const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.loginRequired = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, process.env.SECRET_KEY, function (error, decoded) {
            if (decoded) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Please log in first",
                });
            }
        });
    } catch (error) {
        return next({
            status: 401,
            message: "Please log in first",
        });
    }
};

exports.ensureCorrectUser = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, process.env.SECRET_KEY, function (error, decoded) {
            if (decoded && decoded.id === req.params.id) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Unauthorized",
                });
            }
        });
    } catch (error) {
        return next({
            status: 401,
            message: "Unauthorized",
        });
    }
};
