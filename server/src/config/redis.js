const { createClient } = require("redis");
const redisClient = createClient({
    url:process.env.REDIS_URL,
})

const connectRedis = async() =>{
    await redisClient.connect();
}

module.exports ={
    redisClient,
    connectRedis
}