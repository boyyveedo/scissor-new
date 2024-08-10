import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();


console.log('Connecting to Redis at:', process.env.REDIS_URL);

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
    await redisClient.connect();
})();

export default redisClient;
