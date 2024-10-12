import React from 'react'
import Link from 'next/link'

function navbar() {
  return (
    <nav className='bg-[#333] text-white p-5'>
        <div className='container mx-auto'>
            <div className='flex justify-between items-center'>
                <div>
                    <Link href="/">home</Link>
                </div>
                <ul className='flex'>
                    <li className='mx-3'><Link href="/login">Sign in</Link></li>
                    <li className='mx-3'><Link href="/register">Sign up</Link></li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default navbar
