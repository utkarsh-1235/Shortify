import {connectTodb } from '@/app/lib/db';
import {NextRequest, NextResponse} from 'next/server';
import userModel from '@/app/models/user';


export async function POST(request: NextRequest) {
   try{
    const {email, password} = await request.json();
    if(!email || !password){
        return NextResponse.json(
            {error: "Email and Password are required"},
            {status: 400}
        )
    }

    // await connectTodb();
    // const existingUser = await userModel.findOne({email})
    // if(existingUser){
    //     return NextResponse.json(
    //         {error: "User already exists"},
    //         {status: 401}
    //     )
    // }
  
    await userModel.create({
        email,
        password
    })

    return NextResponse.json(
        {message: "User created successfully"},
        {status: 200}
    )

   }catch(err){
    console.log(err);
    return NextResponse.json(
        {error: 'Failed to register user'},
        {status: 500}
    )
   }
}