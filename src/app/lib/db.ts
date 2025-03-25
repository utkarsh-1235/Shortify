  import mongoose from 'mongoose';
import { buffer } from 'stream/consumers';

  const MONGODB_URL = process.env.MONGODB_URL! ;

  if(!MONGODB_URL){
    throw new Error('Not Getting Database url from database');
  }

  let hell = global.mongoose;

  if(!hell){
    hell = global.mongoose = {conn: null, promise: null}
  }

  export async function dbConnect(){
    if(hell.conn){
        return hell.conn;
    }

    if(hell.promise){
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        }

        hell.promise = mongoose.connect(MONGODB_URL,opts).then(()=> mongoose.connection);

    }

    try{
        hell.conn = await hell.promise;
    }catch(err){
        hell.conn = null
        throw err
    }
    return hell.conn;
  }
