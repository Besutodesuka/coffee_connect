"use client"
// this is rendered in client site able to use hook
import React, {useState} from 'react'
import Container from "../components/Container";
import Navbar from '../components/navbar'
import Footer from "../components/Footer";
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'

function RegisterPage() {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [error, setError] = useState("");
const [success, setSuccess] = useState("");

// const { data: session } = useSession();
// if (session) redirect('/home');

const handleRegistration = async (e) => {
    //prevent refresh
    e.preventDefault();

    // check password
    if (password != confirmPassword) {
        setError("Password do not match!");
        return;
    }

    // check feild complete
    if (!name || !email || !password || !confirmPassword) {
        setError("Please complete all inputs.");
        return;
    }

    // try logging in first
    const resCheckUser = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
    })

    const { user } = await resCheckUser.json();

    // check if user is already registered 
    if (user) { 
        setError("User already exists.");
        return;
    }

    // request register
    try {
        const res = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password
            })
        })

        if (res.ok) {
            const form = e.target;
            setError("");
            setSuccess("User registration successfully!");
            form.reset();
        } else {
            console.log("User registration failed.")
        }

    } catch(error) {
        console.log("Error during registration: ", error)
    }
};

  return (
    <Container>
        <Navbar />
            <div className='flex-grow'>
                <div className="flex justify-center items-center">
                    <div className='w-[400px] shadow-xl p-10 mt-5 rounded-xl'>
                        <h3 className='text-3xl'>Register Page</h3>
                        <hr className='my-3' />
                        <form onSubmit={handleRegistration}>

                            {error && (
                                <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className='bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                                    {success}
                                </div>
                            )}

                            <input type="text" onChange={(e) => setName(e.target.value)} className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter your name' />
                            <input type="text" onChange={(e) => setEmail(e.target.value)} className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter your email Ex. coffee@example.com' />
                            <input type="password" onChange={(e) => setPassword(e.target.value)} className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter your password' />
                            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Confirm your password' />
                            <button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>begin the journey</button>
                        </form>
                        <hr className='my-3' />
                        <p>Already stared journey yet? Continue your journey <Link className='text-yellow-700 hover:underline' href='/login'>here</Link> </p>
                    </div>
                </div>
            </div>
        <Footer />
    </Container>
  )
}

export default RegisterPage
