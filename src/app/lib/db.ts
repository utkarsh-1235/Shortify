  import mongoose from 'mongoose';
import { buffer } from 'stream/consumers';

  const MONGODB_URL = process.env.MONGODB_URL! || 'mongodb://localhost:27017/mydatabase'
  ;
 console.log(MONGODB_URL);
  if(!MONGODB_URL){
    throw new Error('Not Getting Database url from database');
  }

 let cached = global.mongoose;
console.log('cached',cached);

if(!cached){
   cached = global.mongoose = {conn: null, promise: null}
}

export async function connectTodb(){
  if(cached.conn){
    console.log('Cached Connection',cached.conn);
    return cached.conn;
  }

  if(!cached.promise){
     const opts = {
      bufferCommands: true,
      maxPoolSize: 10
     }

     cached.promise = mongoose
                      .connect(MONGODB_URL,opts)
                      .then(()=>mongoose.connection);
  }
  try{
    cached.conn = await cached.promise;

  }catch(err){
    cached.promise = null;
    throw new Error("Check database file")
  }

  return cached.conn;
}