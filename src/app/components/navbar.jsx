import React from 'react'
import Link from 'next/link'
import {signOut, useSession} from 'next-auth/react'

function navbar() {
    const {data: session } = useSession();
    console.log(session);
    return (
    <nav className='bg-[#333] text-white p-5'>
        <div className='container mx-auto'>
            <div className='flex justify-between items-center'>
                <div>
                    <Link href="/">home</Link>
                </div>
                <ul className='flex'>
                    {/* {redirect to user profile} */}
                    {session && (
                    <li className='mx-3'>
                        <Link href="/profile">
                            Profile
                        </Link>
                    </li>
                    )}
                    {/* {when the user has not logged in} */}
                    {!session && (
                    <div>
                    <li className='mx-3'>
                        <Link href="/login">
                            Sign in
                        </Link>
                    </li>
                    <li className='mx-3'>
                        <Link href="/register">
                             Sign up
                        </Link>
                    </li>
                    </div>
                    )}
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default navbar
