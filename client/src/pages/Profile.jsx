import React, { useEffect, useState } from 'react'
import HomeLayout from '../components/HomeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { GrDocumentUpdate } from "react-icons/gr";
import { updateProfile } from '../redux/slices/authSlice';

function Profile() {
  const { data, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [previewImage, setPreviewImage] = useState(null);
  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    avatar: '',
  });

  useEffect(() => {
    setUserInput({
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      phone: data?.phone || '',
      avatar: data?.avatar.secure_url || '',
    });
  }, [data]);

  const handelUserInput = (e) => {
    const { value, name } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const updateImageHandler = (e) => {
    try {
      e.preventDefault();
      const uploadFile = e.target.files;
      console.log(uploadFile);
      if (uploadFile) {
        const uploadImage = uploadFile[0];
        setUserInput((prev) => ({
          ...prev,
          avatar: uploadImage,
        }));

        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadImage);
        fileReader.addEventListener('load', function () {
          setPreviewImage(this.result)
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(userInput);
  // console.log(previewImage);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {

      const formData = new FormData();

      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('phone', phone);

      const res = await dispatch(updateProfile([formData, token]));
      console.log(res);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <HomeLayout
      title={`Home 99 - ${data?.firstName} ${data?.lastName}` || "Profile"}
      description={"Best Flat in New Delhi"}
    >
      <form onSubmit={onFormSubmit}>
        <div className='max-w-[1200px] border p-4 mx-auto mt-20'>
          <div className='flex items-center justify-between'>
            <div>
              <label className='inline-block relative rounded-full w-[100px] h-[100px] border ' htmlFor="avatar">
                <img src={previewImage || userInput.avatar} className='rounded-full object-cover w-full h-full' alt='avatar' />
                <span className='absolute bottom-0 right-0 font-bold text-sm bg-white text-[#7f1657] rounded-full p-2 border cursor-pointer'>
                  <GrDocumentUpdate />
                </span>
              </label>
              <input
                type='file'
                id='avatar'
                name='avatar'
                className='hidden'
                onChange={updateImageHandler}
              />
            </div>
            <div className='text-red-600 cursor-pointer'>
              Delete Account
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
            <div className='my-3 flex flex-col gap-2'>
              <label htmlFor='firstName' className=''>First Name <sup className='text-pink-400'>*</sup></label>
              <input
                type='text'
                id='firstName'
                name='firstName'
                value={userInput.firstName}
                className='w-full py-3 px-3 rounded border outline-0'
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
                className='w-full py-3 px-3 rounded border outline-0'
                value={userInput.lastName}
                placeholder='Enter Last Name'
                onChange={handelUserInput}
              />
            </div>
          </div>
          <div className='my-3 flex flex-col gap-2'>
            <label htmlFor='phone' className=''>Phone Number <sup className='text-pink-400'>*</sup></label>
            <input
              type='text'
              id='phone'
              name='phone'
              className='w-full py-3 px-3 rounded border outline-0'
              value={userInput.phone}
              placeholder='Enter Your Phone Number'
              onChange={handelUserInput}
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='bg-[#7f1657] text-xl w-[100px] inline-block text-white rounded h-[40px] mt-3 hover:scale-110 duration-300 ease-in-out transition-all'
            >
              Edit
            </button>
          </div>
        </div>
      </form>
    </HomeLayout>
  )
}

export default Profile