import React, { useEffect, useState } from 'react'
import HomeLayout from '../components/HomeLayout'
import { useSelector } from 'react-redux'

function Profile() {
  const { data } = useSelector((state) => state.auth);

  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  useEffect(() => {
    setUserInput({
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      phone: data?.phone || '',
    });
  }, [data]);

  const handelUserInput = (e) => {
    const { value, name } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  console.log(userInput);
  return (
    <HomeLayout
      title={`Home 99 - ${data?.firstName} ${data?.lastName}` || "Profile"}
      description={"Best Flat in New Delhi"}
    >
      <div className='grid grid-cols-1 lg:grid-cols-5 mt-10 min-h-screen p-5 mx-auto gap-3'>
        <div className='lg:col-span-2 h-[400px] border p-4'>
          <div className='flex flex-col items-center my-4'>
            <div className='w-[100px] h-[100px]'>
              <img src={data?.avatar?.secure_url} alt={data?.firstName} className='w-full h-full object-cover border-4 border-[#7f1657] rounded-full' />
            </div>
            <h2 className='font-bold capitalize text-3xl font-mono'>
              {data?.firstName} {data?.lastName}
            </h2>
          </div>
          <p className='font-bold text-2xl text-[#7f1657]'>
            Email: {" "}
            <span className='font-semibold text-black'>{data?.email}</span>
          </p>
          <p className='font-bold text-2xl text-[#7f1657] my-1'>
            Phone: {" "}
            <span className='font-semibold text-black'>{data?.phone}</span>
          </p>
          <p className='font-bold text-2xl text-[#7f1657]'>
            Role: {" "}
            <span className='font-semibold text-black'>{data?.role}</span>
          </p>
          <div className='flex items-center justify-center gap-2 mt-5'>
            <button className='bg-[#7f1657] w-[50%] py-3 text-white font-bold rounded'>Change Password</button>
            <button className='bg-[#7f1657] w-[50%] py-3 text-white font-bold rounded'>Delete Account</button>
          </div>
        </div>
        <div className='h-screen lg:col-span-3'>
          <div className='w-full h-[200px] mb-4 border p-5'>
            <div className='flex items-center gap-4 mb-5'>
              <img src={data?.avatar?.secure_url} className='w-[100px] h-[100px] object-cover border-2 border-[#7f1657] rounded-full' />
              <h2 className='font-bold capitalize text-3xl font-mono'>{data?.firstName} {data?.lastName}</h2>
            </div>
            <div>
              <label htmlFor='avatar' className='bg-[#7f1657] px-5 py-2 text-white font-bold rounded cursor-pointer'>Update</label>
              <input
                type='file'
                id='avatar'
                className='hidden'
              />
            </div>
          </div>
          <div className='w-full h-[420px] border p-5'>
            <form>
              <h2 className='text-2xl border-b-2 border-[#7f1657]'>Edit Profile</h2>
              <div className='my-3 flex flex-col gap-2'>
                <label htmlFor='firstName' className=''>First Name <sup className='text-pink-400'>*</sup></label>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  value={userInput.firstName}
                  className='w-full py-3 px-3 rounded outline-0 border'
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
                  className='w-full py-3 px-3 rounded outline-0 border'
                  value={userInput.lastName}
                  placeholder='Enter Last Name'
                  onChange={handelUserInput}
                />
              </div>
              <div className='my-3 flex flex-col gap-2'>
                <label htmlFor='phone' className=''>Phone Number <sup className='text-pink-400'>*</sup></label>
                <input
                  type='text'
                  id='phone'
                  name='phone'
                  className='w-full py-3 px-3 rounded outline-0 border'
                  value={userInput.phone}
                  placeholder='Enter Your Phone Number'
                  onChange={handelUserInput}
                />
              </div>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='bg-red-400 text-xl w-[140px] inline-block text-white rounded h-[40px] mt-3 hover:bg-red-500 hover:scale-110 duration-300 ease-in-out transition-all'
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}

export default Profile