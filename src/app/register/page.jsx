"use client"
// this is rendered in client site able to use hook
import React, {useState} from 'react'
function RegisterPage() {

const [firstname, setFirstName] = useState("");
const [lastname, setLastName] = useState("");
const [username, setUserName] = useState("");
const [email, setEmail] = useState("");
const [dob, setDOB] = useState("");
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
    if (!username || !firstname || !lastname || !email || !password || !confirmPassword) {
        setError("Please complete all inputs.");
        return;
    }

    // try logging in first
    const resCheckUser = await fetch("/api/login", {
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
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, email, firstname, lastname, dob, password
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
        <div className="w-full h-auto relative bg-[#f0e7e0] p-4">
            <div className="max-w-4xl mx-auto h-auto mt-10 flex flex-col items-center gap-6">
                <img
                className="my-10 w-64 h-64 object-cover rounded-full"
                src="/Coffee_Connect.svg"
                alt="Profile"
                />
                <form 
                className="w-full bg-white rounded-lg border border-[#d9d9d9] p-6 flex flex-col gap-6"
                onSubmit={handleRegistration}
                >
                {/* Email Field */}
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="email" className="text-[#1e1e1e] text-sm sm:text-base md:text-lg font-normal font-['Public Sans']">
                    Email
                    </label>
                    <input
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="example@gmail.com"
                    className="w-full px-4 py-3 bg-white rounded-lg border border-[#d9d9d9] text-sm sm:text-base font-normal font-['Public Sans'] text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#1b3dd6]"
                    required
                    />
                </div>
                
                {/* First Name Field */}
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="firstName" className="text-[#1e1e1e] text-sm sm:text-base md:text-lg font-normal font-['Public Sans']">
                    First Name
                    </label>
                    <input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-lg border border-[#d9d9d9] text-sm sm:text-base font-normal font-['Public Sans'] text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#1b3dd6]"
                    required
                    />
                </div>

                {/* Last Name Field */}
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="lastName" className="text-[#1e1e1e] text-sm sm:text-base md:text-lg font-normal font-['Public Sans']">
                    Last Name
                    </label>
                    <input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)} 
                    className="w-full px-4 py-3 bg-white rounded-lg border border-[#d9d9d9] text-sm sm:text-base font-normal font-['Public Sans'] text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#1b3dd6]"
                    required
                    />
                </div>

                {/* Date of Birth Field */}
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="dob" className="text-[#1e1e1e] text-sm sm:text-base md:text-lg font-normal font-['Public Sans']">
                    Date of Birth
                    </label>
                    <input
                    id="dob"
                    type="date"
                    onChange={(e) => setDOB(e.target.value)} 
                    className="w-full px-4 py-3 bg-white rounded-lg border border-[#d9d9d9] text-sm sm:text-base font-normal font-['Public Sans'] text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#1b3dd6]"
                    required
                    />
                </div>

                {/* Username Field */}
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="username" className="text-[#1e1e1e] text-sm sm:text-base md:text-lg font-normal font-['Public Sans']">
                    Username
                    </label>
                    <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)} 
                    className="w-full px-4 py-3 bg-white rounded-lg border border-[#d9d9d9] text-sm sm:text-base font-normal font-['Public Sans'] text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#1b3dd6]"
                    required
                    />
                </div>

                {/* Password Field */}
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="password" className="text-[#1e1e1e] text-sm sm:text-base md:text-lg font-normal font-['Public Sans']">
                    Password
                    </label>
                    <input
                    id="password"
                    type="password"
                    placeholder="********"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-lg border border-[#d9d9d9] text-sm sm:text-base font-normal font-['Public Sans'] text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#1b3dd6]"
                    required
                    />
                </div>

                {/*Confirm Password Field */}
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="password" className="text-[#1e1e1e] text-sm sm:text-base md:text-lg font-normal font-['Public Sans']">
                    Re-enter your password
                    </label>
                    <input
                    id="password"
                    type="password"
                    placeholder="********"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-lg border border-[#d9d9d9] text-sm sm:text-base font-normal font-['Public Sans'] text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#1b3dd6]"
                    required
                    />
                </div>

                {/* Sign Up Button */}
                <button
                    type="submit"
                    className="w-full h-12 bg-[#312218] text-white text-sm sm:text-base md:text-lg font-normal font-['Public Sans'] rounded-lg border border-[#2c2c2c] hover:bg-[#4a3427] focus:outline-none focus:ring-2 focus:ring-[#1b3dd6]"
                >
                    Sign up
                </button>

                {/* error alert */}
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

                {/* Already Have Account */}
                <div className="w-full text-center text-sm sm:text-base md:text-lg font-normal font-['Public Sans']">
                    <span className="text-[#1e1e1e]">Already have an account? </span>
                    <a href="/login" className="text-[#1b3dd6] underline cursor-pointer hover:text-[#1429b5]">
                    Sign in
                    </a>
                </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
