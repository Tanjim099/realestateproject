import React, { useState } from 'react'
import HomeLayout from '../components/HomeLayout'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsPersonCircle } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { sendOTP, setUserData } from '../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { FaArrowLeftLong } from "react-icons/fa6";
function Register() {
    // firstName, lastName, email, phone, password, otp, answer
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState("");
    const [userInput, setUserInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        answer: '',
        password: '',
        avatar: '',
    });

    const handelUserInput = (e) => {
        const { value, name } = e.target;
        setUserInput((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleImage = (event) => {
        event.preventDefault();

        const uploadedFiles = event.target.files;

        if (uploadedFiles && uploadedFiles.length > 0) {
            const uploadImage = uploadedFiles[0];

            setUserInput({
                ...userInput,
                avatar: uploadImage,
            });

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);

            fileReader.addEventListener('load', function () {
                setPreviewImage(this.result);
            });
        }
    };


    // console.log(previewImage);
    console.log(userInput);
    const onFormSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            console.log(userInput.email);
            await dispatch(sendOTP(userInput.email));
            dispatch(setUserData(userInput));
            setLoading(false);
            navigate('/verify-email');
        } catch (Error) {
            console.log(Error);
        }
    }


    return (
        <HomeLayout>
            <div className='flex items-center justify-center min-h-screen my-4'>
                {
                    loading
                        ? (<Spinner />)
                        : (<form onSubmit={onFormSubmit} className='border w-[600px] min-h-[500px] p-4'>
                            <Link onClick={() => navigate(-1)}><FaArrowLeftLong /></Link>
                            <h2 className='text-3xl font-mono mt-3 border-b'>Register Form</h2>
                            <div className='flex items-center justify-center'>
                                <label className='cursor-pointer' htmlFor='avatar'>
                                    {
                                        previewImage
                                            ? (<img src={previewImage} alt={firstName} className='w-24 h-24 mt-3 rounded-full m-auto' />)
                                            : (<BsPersonCircle className='w-24 h-24 mt-3 rounded-full m-auto' />)
                                    }
                                </label>
                                <input
                                    type='file'
                                    name='avatar'
                                    className='hidden'
                                    id='avatar'
                                    onChange={handleImage}
                                    accept='.jpg, .jpeg, .png, .svg'
                                />
                            </div>
                            <div className='my-3 flex flex-col gap-2'>
                                <label htmlFor='firstName' className=''>First Name <sup className='text-pink-400'>*</sup></label>
                                <input
                                    type='text'
                                    id='firstName'
                                    name='firstName'
                                    value={userInput.firstName}
                                    className='w-full py-3 px-3 rounded border-none outline-0'
                                    placeholder='Enter First Name'
                                    onChange={handelUserInput}
                                />
                            </div>
                            <div className='my-3 flex flex-col gap-2'>
                                <label htmlFor='lastName' className=''>Last Name <sup className='text-pink-400'>*</sup></label>
                                <input
                                    type='text'
                                    id='lastName'
                                    name='lastName'
                                    className='w-full py-3 px-3 rounded border-none outline-0'
                                    value={userInput.lastName}
                                    placeholder='Enter Last Name'
                                    onChange={handelUserInput}
                                />
                            </div>
                            <div className='my-3 flex flex-col gap-2'>
                                <label htmlFor='email' className=''>Email <sup className='text-pink-400'>*</sup></label>
                                <input
                                    type='text'
                                    id='email'
                                    name='email'
                                    className='w-full py-3 px-3 rounded border-none outline-0'
                                    value={userInput.email}
                                    placeholder='Enter Your Email'
                                    onChange={handelUserInput}
                                />
                            </div>
                            <div className='my-3 flex flex-col gap-2'>
                                <label htmlFor='phone' className=''>Phone Number <sup className='text-pink-400'>*</sup></label>
                                <input
                                    type='text'
                                    id='phone'
                                    name='phone'
                                    className='w-full py-3 px-3 rounded border-none outline-0'
                                    value={userInput.phone}
                                    placeholder='Enter Your Phone Number'
                                    onChange={handelUserInput}
                                />
                            </div>
                            <div className='my-3 flex flex-col gap-2'>
                                <label htmlFor='answer' className=''>Answer <sup className='text-pink-400'>*</sup></label>
                                <input
                                    type='text'
                                    id='answer'
                                    name='answer'
                                    className='w-full py-3 px-3 rounded border-none outline-0'
                                    value={userInput.answer}
                                    placeholder='Enter Your Answer'
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
                                    value={userInput.password}
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
                                    Register
                                </button>
                            </div>
                        </form>)
                }
            </div>
        </HomeLayout>
    )
}

export default Register