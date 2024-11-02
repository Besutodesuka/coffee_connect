"use client"
// this is rendered in client site able to use hook
import React, { useState } from 'react'
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter, redirect } from 'next/navigation'
import { useSession } from 'next-auth/react';

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const { data: session } = useSession();
    if (session) router.replace('home');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await signIn("credentials", {
                email, password, redirect: false
            })

            if (res.error) {
                setError("Invalid credentials");
                return;
            }

            router.replace("home");

        } catch(error) {
            console.log(error);
        }
    }

  return (
    <Container>
    <Navbar />
        <div className='flex-grow'>
            <div className="flex justify-center items-center">
                <div className='w-[400px] shadow-xl p-10 mt-5 rounded-xl'>
                    <h3 className='text-3xl'>Login Page</h3>
                    <hr className='my-3' />
                    <form onSubmit={handleSubmit}>
                    <input className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email Ex. coffee@example.com" />
                    <input className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
                    <button className="bg-green-600 p-2 rounded-md text-white" type="submit">Sign in</button>
                    </form>
                    <hr className='my-3' />
                    <p>Have not stared journey yet? Your journey Begin <Link className='text-yellow-700 hover:underline' href='/register'>here</Link> </p>
                </div>
            </div>
        </div>
    <Footer />
</Container>
)
}

export default LoginPage
