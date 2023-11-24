import React, { useState } from 'react'
import HomeLayout from '../../components/HomeLayout'
import { CiCirclePlus } from "react-icons/ci";

function CreateProject() {
    const [galleryImages, setGalleryImages] = useState([]);

    const handleGalleryImage = (e) => {
        e.preventDefault();
        let uploadImages = e.target.files;

        if (uploadImages.length > 0) {
            const fileReaderArray = Array.from(uploadImages).map((image) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(image);

                return new Promise((resolve) => {
                    fileReader.onload = () => {
                        resolve({
                            dataURL: fileReader.result,
                            file: image,
                        });
                    };
                });
            });

            Promise.all(fileReaderArray).then((results) => {
                setGalleryImages((prev) => [...prev, ...results]);
            });
        }
    };
    console.log(galleryImages.length);

    return (
        <HomeLayout>
            <div className='flex justify-center items-center min-h-screen'>
                <div className='border w-[600px] min-h-[500px] my-[50px] mx-[20px] rounded shadow-sm'>
                    <form className='p-4'>
                        <h2 className='text-3xl font-mono mt-3 border-b'>Create Project</h2>
                        <div className='my-3 flex flex-col gap-2'>
                            <label htmlFor='name'>Name<sup className='text-pink-400'>*</sup></label>
                            <input
                                type='text'
                                name='name'
                                className='w-full py-3 px-3 rounded border-none outline-0'
                                placeholder='Enter Project Name'
                            />
                        </div>
                        <div className='my-3 flex flex-col gap-2'>
                            <label htmlFor='name'>Location<sup className='text-pink-400'>*</sup></label>
                            <input
                                type='text'
                                name='location'
                                className='w-full py-3 px-3 rounded border-none outline-0'
                                placeholder='Enter Project Location'
                            />
                        </div>
                        <div className='my-3 flex flex-col gap-2'>
                            <label htmlFor='name'>Developer<sup className='text-pink-400'>*</sup></label>
                            <input
                                type='text'
                                name='developer'
                                className='w-full py-3 px-3 rounded border-none outline-0'
                                placeholder='Enter Project Developer'
                            />
                        </div>
                        <div className='my-3 flex flex-col gap-2'>
                            <label htmlFor='name'>Developer<sup className='text-pink-400'>*</sup></label>
                            <textarea
                                type='text'
                                name='developer'
                                className='w-full py-3 px-3 rounded border-none outline-0 resize-none min-h-[100px] overflow-y-hidden'
                                placeholder='Enter Project Developer'
                            />
                        </div>
                        <div className='my-3 flex flex-col gap-2'>
                            <label htmlFor='name'>Specifications<sup className='text-pink-400'>*</sup></label>
                            <input
                                type='text'
                                name='specifications'
                                className='w-full py-3 px-3 rounded border-none outline-0'
                                placeholder='Enter Project Specifications'
                            />
                        </div>
                        <div className='my-3 flex flex-col gap-2'>
                            <label htmlFor='name'>StartingFrom<sup className='text-pink-400'>*</sup></label>
                            <input
                                type='text'
                                name='startingFrom'
                                className='w-full py-3 px-3 rounded border-none outline-0'
                                placeholder='Enter Project StartingFrom'
                            />
                        </div>
                        <div className='my-3 flex flex-col gap-2'>
                            <label htmlFor='name'>Currency<sup className='text-pink-400'>*</sup></label>
                            <input
                                type='text'
                                name='currency'
                                className='w-full py-3 px-3 rounded border-none outline-0'
                                placeholder='Enter Project Currency'
                            />
                        </div>
                        <div className='my-3 flex flex-col gap-2'>
                            <label htmlFor='name'>Email<sup className='text-pink-400'>*</sup></label>
                            <input
                                type='text'
                                name='email'
                                className='w-full py-3 px-3 rounded border-none outline-0'
                                placeholder='Enter Project Email'
                            />
                        </div>
                        <div className='my-3 flex flex-col gap-2'>
                            <label htmlFor='name'>Phone<sup className='text-pink-400'>*</sup></label>
                            <input
                                type='text'
                                name='phone'
                                className='w-full py-3 px-3 rounded border-none outline-0'
                                placeholder='Enter Project Phone'
                            />
                        </div>
                        <div className='my-3 inline-block'>
                            <label htmlFor='gallery' className='border px-3 py-2 cursor-pointer rounded'>
                                Gallery
                                <sup className='text-pink-400'>*</sup>
                            </label>
                            <input
                                type='file'
                                id='gallery'
                                onChange={handleGalleryImage}
                                className='hidden'
                            />
                        </div>
                        <div className='flex gap-4 my-4'>
                            {
                                galleryImages.length != 0 ?
                                    (
                                        galleryImages.map((galleryImage, idx) => (
                                            <div key={idx} className='flex-row w-[100px] h-[100px] outline-dashed p-1'>
                                                <img className='w-full h-full object-cover' src={galleryImage.dataURL} />
                                            </div>
                                        ))
                                    )
                                    :
                                    (
                                        <div className='flex capitalize flex-col items-center font-bold text-center justify-center w-[100px] h-[100px] outline-dashed p-1'>
                                            <CiCirclePlus className='font-bold text-2xl text-red-700' />
                                            Gallery Image Add
                                        </div>
                                    )
                            }
                        </div>
                        <div className='flex justify-end'>
                            <button
                                type='submit'
                                className='bg-red-400 text-xl w-[140px] inline-block text-white rounded h-[40px] mt-3 hover:bg-red-500 hover:scale-110 duration-300 ease-in-out transition-all'
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </HomeLayout>
    )
}

export default CreateProject;