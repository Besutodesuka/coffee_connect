"use client"
// this is rendered in client site able to use hook
import React, {useState} from 'react'
import Navbar from '../components/navbar'
import Link from 'next/link'

function RegisterPage() {

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [error, setError] = useState('');

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
    <div>
      <Navbar/>
      <div className='container mx-auto'>
        <h3>Provide us information to begin coffee journey</h3>
        <hr className='my-3'></hr>
        <form action='' onSubmit={handleRegistration}>
            {
                error && (
                    <div className='bg-red-600 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                        {error}
                    </div>
                )
            }
            <input onChange={(e) => setName(e.target.value)} className="block bg-gray-300 p-2 my-2 rounded-md" type="text" placeholder='Enter your Name' />
            <input onChange={(e) => setEmail(e.target.value)} className="block bg-gray-300 p-2 my-2 rounded-md" type="email" placeholder="Enter your email Ex. coffee@example.com" />
            <input onChange={(e) => setPassword(e.target.value)} className="block bg-gray-300 p-2 my-2 rounded-md" type="password" placeholder="Enter your password" />
            <input onChange={(e) => setConfirmPassword(e.target.value)} className="block bg-gray-300 p-2 my-2 rounded-md" type="password" placeholder="Confirm your password" />
            <button className="bg-green-600 p-2 rounded-md text-white" type="submit">begin the journey</button>
        </form>
        <hr className='my-3'></hr>
        <p>Already stared journey yet? Continue your journey <Link className='text-yellow-700 hover:underline' href='/login'>here</Link> </p>
      </div>
    </div>
  )
}

export default RegisterPage
