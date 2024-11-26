import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        console.log('Fuk');
        // Parse the request body
        const { email, newPassword } = await req.json();
        console.log('Fuk1');

        if (!email || !newPassword) {

            return NextResponse.json(
                { message: 'Email and new password are required.' },
                { status: 400 }
            );
        }
        console.log('Fuk2')
        // Connect to the database
        await connectMongoDB();
        console.log('Fuk3')
        // Find the user by email
        const user = await User.findOne({ email });
        console.log('Fuk4')
        if (!user) {
            console.log(email)
            return NextResponse.json(
                { message: 'User not found.' },
                { status: 404 }
            );
        }
        console.log('Fuk5')
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json(
            { message: 'Password reset successfully!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in POST /api/resetPass:', error);
        return NextResponse.json(
            { message: 'Internal server error.' },
            { status: 500 }
        );
    }
}
