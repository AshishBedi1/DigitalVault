
const express = require("express");
const authRoutes = require("./routes/auth.routes")
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running");
});
app.use("/api/v1/auth", authRoutes);

module.exports = app;