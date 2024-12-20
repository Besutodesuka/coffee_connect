import { NextResponse } from 'next/server'
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';
import bcrypt from 'bcryptjs'

export async function POST(req) {
    // try {

    const {username, email, firstname, lastname, dob, password} = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();
    await User.create({ 
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        dateofbirth: dob,
        password: hashedPassword 
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 })

    // } catch(error) {

    //     return NextResponse.json({ message: "An error occured while registering the user." }, { status: 500 })

    // }
}