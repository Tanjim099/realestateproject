import React, { useState } from 'react'
import HomeLayout from '../components/HomeLayout'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        email: '',
        password: '',
    });

    const handelUserInput = (e) => {
        const { value, name } = e.target;
        setUserInput((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const onFormSubmit = async (e) => {
        try {
            e.preventDefault();

            if (!userInput.email || !userInput.password) {
                toast.error('All field are mandatory...');
            }

            const res = await dispatch(login(userInput));

            // console.log(res?.payload?.success);
            
            if (res?.payload?.success) {
                navigate('/');
            }

            setUserInput({
                email: '',
                password: '',
            });

        } catch (Error) {
            console.log(Error);
        }
    }

    return (
        <HomeLayout>
            <div className='flex items-center justify-center min-h-screen my-4'>
                <form onSubmit={onFormSubmit} className='border w-[600px] min-h-[200px] p-4'>
                    <h2 className='text-3xl font-mono mt-3 border-b'>Login Form</h2>
                    <div className='my-3 flex flex-col gap-2'>
                        <label htmlFor='email' className=''>Email <sup className='text-pink-400'>*</sup></label>
                        <input
                            type='text'
                            id='email'
                            name='email'
                            className='w-full py-3 px-3 rounded border-none outline-0'
                            placeholder='Enter Your Email'
                            onChange={handelUserInput}
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
                            onChange={handelUserInput}
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