import React, { useState } from 'react'
import HomeLayout from '../../components/HomeLayout'
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../../redux/slices/blogSlice';
import Spinner from '../../components/Spinner';
import AdminLayout from '../../components/AdminLayout';
import JoditEditor from 'jodit-react';
import { useLocation } from 'react-router-dom';

function UpdateBlog() {
    const { state } = useLocation();
    const [loading, setLoading] = useState(false);
    const { data } = useSelector((state) => state.auth);
    // console.log(data._id);
    const dispatch = useDispatch();
    const [previwImage, setPreviewImage] = useState('');
    const [userInput, setUserInput] = useState({
        title: '',
        category: '',
        description: '',
        content: '',
        // author: data._id,
        image: '',
    });

    const inputUser = (e) => {
        const { value, name } = e.target;

        setUserInput((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    const imageUpload = (e) => {
        const uploadImage = e.target.files[0];
        if (uploadImage) {
            setUserInput((prev) => ({
                ...prev,
                image: uploadImage
            }));

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);

            fileReader.addEventListener('load', function () {
                setPreviewImage(this.result);
            })

        }
    }

    const descriptionContent = (data) => {
        setUserInput((prev) => ({
            ...prev,
            description: data
        }));
    }

    const onFormSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const formData = new FormData();

            formData.append("title", userInput.title);
            formData.append("category", userInput.category);
            formData.append("description", userInput.description);
            formData.append("content", userInput.content);
            formData.append("author", userInput.author);
            formData.append("image", userInput.image);

            const res = await dispatch(createBlog(formData));

            if (res?.payload?.success) {
                setUserInput({
                    title: '',
                    category: '',
                    description: '',
                    content: '',
                    author: '',
                    image: '',
                })

                setPreviewImage('');
            }

            setLoading(false);

        } catch (Error) {
            console.log(Error);
        }
    }
    console.log(state)
    const editorConfig = {
        minHeight: '500px', // Set your desired height here
    };
    return (
        <AdminLayout>
            <div className="w-full flex justify-between gap-5">
                <div className='w-[70%]'>
                    <div className='w-full '>
                        <label htmlFor="title">Title</label>
                        <input className='w-full p-2 rounded-sm outline-none text-xl mt-1' style={{ border: "1px solid gray" }} type="text" placeholder='title' />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor='content'>Content<sup className='text-pink-400'>*</sup></label>
                        <JoditEditor
                            type='text'
                            name='content'
                            id='content'
                            config={editorConfig}
                            className='w-full py-3 px-3 rounded border outline-0 min-h-[200px] resize-none mt-1'
                            value={userInput.description}
                            placeholder='Enter Blog Description'
                            onChange={(data) => descriptionContent(data)}
                        />
                    </div>
                    <div className='flex flex-col mt-4'>
                        <label htmlFor="description">Description</label>
                        <textarea
                            className=' outline-none rounded-sm p-2 mt-1'
                            style={{ border: "1px solid gray" }}
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                            placeholder='description...'
                        >
                        </textarea>
                    </div>
                </div>
                <div className='w-[30%]'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="category">Category</label>
                        <input className='w-full p-2 rounded-sm outline-none text-xl mt-1 ' style={{ border: "1px solid gray" }} type="text" name='category' id='category' placeholder='category...' />
                    </div>
                    <div className='w-full mt-4'>
                        {
                            previwImage ? (
                                <div className='w-full h-[150px] border-4 border-dotted'>
                                    <img src={previwImage} className='w-full h-full object-contain' alt='Blog-Imgae' />
                                </div>
                            )
                                :
                                (
                                    <>
                                        <label htmlFor='image' className='inline-block border-dotted border-2 w-full h-[150px] cursor-pointer' >
                                            <p className='flex items-center justify-center text-3xl w-full h-full'>
                                                Image
                                            </p>
                                        </label>

                                        <input
                                            type="file"
                                            id='image'
                                            onChange={imageUpload}
                                            className='hidden'
                                        /></>
                                )
                        }
                    </div>
                    <div>
                        <button className=' bg-[#007aff] w-full rounded-md  text-white p-2 mt-5'>Create Blog</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default UpdateBlog;