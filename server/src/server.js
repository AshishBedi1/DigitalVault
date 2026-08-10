require("dotenv").config();

const app = require("./app");

const { connectRedis } = require("./config/redis")
const PORT = process.env.PORT || 5005;

const startServer = async () => {
    try {
        await connectRedis();

        app.listen(PORT, () => {
            console.log(`app is listen on PORT ${PORT}`);
        })


    } catch (error) {
        console.error("Failed to connect to Redis:", error);
        process.exit(1);

    }
}

startServer();