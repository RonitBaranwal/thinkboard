import ratelimit from "../config/upstash.js";

const rateLimiter = async function(req, res, next){
    try {
        const { success } = await ratelimit.limit("my-limit-key");
        if (!success) {
            return res.status(429).json({
                message:"Too many requests",
            })
        }
        next();
    } catch (err) {
        console.error(err);
        next(err);
    }
}
export default rateLimiter;