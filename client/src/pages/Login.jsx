import React, { useState } from 'react'
import HomeLayout from '../components/HomeLayout'
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <HomeLayout>
            <div className='flex items-center justify-center min-h-screen my-4'>
                <form className='border w-[600px] min-h-[200px] p-4'>
                    <h2 className='text-3xl font-mono mt-3 border-b'>Login Form</h2>
                    <div className='my-3 flex flex-col gap-2'>
                        <label htmlFor='email' className=''>Email <sup className='text-pink-400'>*</sup></label>
                        <input
                            type='text'
                            id='email'
                            name='email'
                            className='w-full py-3 px-3 rounded border-none outline-0'
                            placeholder='Enter Your Email'
                        />
                    </div>
                    <div className='my-3 flex flex-col gap-2 relative'>
                        <label htmlFor='password' className=''>Password <sup className='text-pink-400'>*</sup></label>
                        <input
                            type={`${!showPassword ? 'password' : 'text'}`}
                            id='password'
                            name='password'
                            className='w-full py-3 px-3 rounded border-none outline-0 relative'
                            placeholder='Enter Your Password'
                        />
                        <span onClick={() => setShowPassword((prev) => !prev)} className='absolute right-3 top-[45px] cursor-pointer'>
                            {
                                !showPassword ? (<FaEye className='text-2xl' />) : (<FaEyeSlash className='text-2xl' />)
                            }
                        </span>
                    </div>
                    <div className='flex justify-end'>
                        <button
                            type='submit'
                            className='bg-red-400 text-xl w-[140px] inline-block text-white rounded h-[40px] mt-3 hover:bg-red-500 hover:scale-110 duration-300 ease-in-out transition-all'
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Login