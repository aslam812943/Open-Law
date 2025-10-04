import redis  from "../../../config/reddis/Redis";

export class RedisCacheService{
    async set(key:string,expiry:number,value:string):Promise<void>{
        await redis.setex(key,expiry,value)
    }


    async get(key:string):Promise<string|null>{
        return await redis.get(key)
    }


    async del(key:string):Promise<void>{
        await redis.del(key)
    }
}