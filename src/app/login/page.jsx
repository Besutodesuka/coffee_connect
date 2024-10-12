"use client"
// this is rendered in client site able to use hook
import React, {useState} from 'react'
import Navbar from '../components/navbar'
import Link from 'next/link'

function LoginPage() {
  return (
    <div>
      <Navbar/>
      <div className='container mx-auto'>
        <h3>Continue your coffee journey</h3>
        <hr className='my-3'></hr>
        <form action=''>
            <input className="block bg-gray-300 p-2 my-2 rounded-md" type="email" placeholder="Enter your email Ex. coffee@example.com" />
            <input className="block bg-gray-300 p-2 my-2 rounded-md" type="password" placeholder="Enter your password" />
            <button className="bg-green-600 p-2 rounded-md text-white" type="submit">Sign in</button>
        </form>
        <hr className='my-3'></hr>
        <p>Have not stared journey yet? Your journey Begin <Link className='text-yellow-700 hover:underline' href='/register'>here</Link> </p>
      </div>
    </div>
  )
}

export default LoginPage
