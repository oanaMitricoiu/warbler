require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/errors");
const authRoutes = require("./routes/auth");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const messagesRoutes = require("./routes/messages");

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use(
    "/api/users/:id/messages",
    loginRequired,
    ensureCorrectUser,
    messagesRoutes
);

app.use("/api/messages", loginRequired, async function (req, res, next) {
    try {
        let messages = await db.Message.find()
            .sort({ createdAt: "desc" })
            .populate("user", {
                username: true,
                profileImageUrl: true,
            });

        return res.status(200).json(messages);
    } catch (error) {
        return next(error);
    }
});

app.use(function (req, res, next) {
    const err = new Error("Not found");
    err.status = 401;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, function () {
    console.log(`App is listening on port ${PORT}`);
});
