import React, { useEffect, useRef, useState } from 'react'
import HomeLayout from '../../components/HomeLayout'
import { CiCirclePlus } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { createNewProject } from '../../redux/slices/projectSlice';
import toast from 'react-hot-toast';
import JoditEditor from 'jodit-react';
import Spinner from '../../components/Spinner';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
// import 'jodit/build/jodit.min.css';
// import 'tailwindcss/dist/tailwind.min.css';

function CreateProject() {
    const [loading, setLoading] = useState(false);
    const [galleryImages, setGalleryImages] = useState([]);
    const [floorImages, setFloorImages] = useState([]);
    const [amenitieImages, setAmenitiesImages] = useState([]);
    const [floorchips, setFloorChips] = useState([]);
    const [amenitiechips, setAmenitieChips] = useState([]);

    const editorConfig = {
        minHeight: '300px', // Set your desired height here
    };


    const editor = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { editProject, project } = useSelector((state) => state.project);
    console.log(editProject);
    const [projectCreateData, setProjectCreateData] = useState({
        name: '',
        location: '',
        developer: '',
        description: '',
        specifications: '',
        startingFrom: '',
        currency: '',
        email: '',
        phone: '',
        city: '',
    });

        useEffect(() => {
           if(editProject){
            projectCreateData.name = project.name;
            projectCreateData.location = project.location;
            projectCreateData.developer = project.developer;
            projectCreateData.description = project.description;
            projectCreateData.specifications = project.specifications;
            projectCreateData.startingFrom = project.startingFrom;
            projectCreateData.currency = project.currency;
            projectCreateData.email = project.email;
            projectCreateData.phone = project.phone;
            projectCreateData.city = project.city;
           }
        }, [project]);

    // console.log(editProject);

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

    const handelFloorPlanImage = (e) => {
        try {
            e.preventDefault();
            let uploadImage = e.target.files;

            if (uploadImage.length > 0) {
                const fileReaderArray = Array.from(uploadImage).map((image) => {
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

                Promise.all(fileReaderArray).then((result) => {
                    setFloorImages((prev) => [...prev, ...result]);
                });
            }

        } catch (Error) {
            console.log(Error);
        }
    }

    const handelFloorKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ",") {
            event.preventDefault();
            const chipValue = event.target.value.trim();

            if (chipValue && !amenitiechips.includes(chipValue)) {
                const newChips = [...floorchips, chipValue];
                setFloorChips(newChips);
                event.target.value = "";
            }

        }

    }

    const handelAmenitieKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ",") {
            event.preventDefault();
            const chipValue = event.target.value.trim();

            if (chipValue && !amenitiechips.includes(chipValue)) {
                const newChips = [...amenitiechips, chipValue];
                setAmenitieChips(newChips);
                event.target.value = "";
            }

        }

    }

    // console.log(amenitiechips);


    const handelAmenitiesImage = (e) => {
        try {
            e.preventDefault();
            const uploadImage = e.target.files;

            if (uploadImage.length > 0) {
                const fileReaderArray = Array.from(uploadImage).map((image) => {
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

                Promise.all(fileReaderArray).then((result) => {
                    setAmenitiesImages((prev) => [...prev, ...result]);
                });

            };

        } catch (Error) {
            console.log(Error);
        }
    }

    const userInput = (e) => {
        const { value, name } = e.target;

        setProjectCreateData((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    console.log(projectCreateData);
    // console.log(galleryImages.file);
    // console.log(floorImages.file);
    // console.log(amenitieImages.file);

    const contantField_1 = (data) => {
        setProjectCreateData((prev) => ({
            ...prev,
            content: data,
        }));
    }

    const contantField_2 = (data) => {
        setProjectCreateData((prev) => ({
            ...prev,
            specifications: data,
        }));
    }
    async function onFormSubmit(e) {
        try {
            e.preventDefault();
            if (editProject) {
                if (!projectCreateData.name || !projectCreateData.location || !projectCreateData.developer || !projectCreateData.description || !projectCreateData.startingFrom || !projectCreateData.currency || !projectCreateData.email || !projectCreateData.phone) {
                    toast.error('Filed are all mandatory...');
                    return;
                }

                const formData = new FormData();
                formData.append('name', projectCreateData.name);
                formData.append('location', projectCreateData.location);
                formData.append('developer', projectCreateData.developer);
                formData.append('description', projectCreateData.description);
                formData.append('startingFrom', projectCreateData.startingFrom);
                formData.append('specifications', projectCreateData.specifications);
                formData.append('currency', projectCreateData.currency);
                formData.append('email', projectCreateData.email);
                formData.append('phone', projectCreateData.phone);
                formData.append('city', projectCreateData.city);
                formData.append('content', projectCreateData.content);

                formData.append('floorName', floorchips);
                formData.append('amenitiesName', amenitiechips);

                for (let i = 0; i < galleryImages.length; i++) {
                    formData.append('gallery', galleryImages[i].file);
                }
                for (let i = 0; i < galleryImages.length; i++) {
                    formData.append('floorPlan', floorImages[i].file);
                }
                for (let i = 0; i < galleryImages.length; i++) {
                    formData.append('amenities', amenitieImages[i].file);
                }
                console.log(formData);

                const res = await dispatch(updateNewProject([formData, project._id]));
                // console.log(res);
                setProjectCreateData({
                    name: '',
                    location: '',
                    developer: '',
                    description: '',
                    specifications: '',
                    startingFrom: '',
                    currency: '',
                    email: '',
                    phone: '',
                    city: '',
                    content: '',
                })
                return;
            }
            setLoading(true);
            if (!projectCreateData.name || !projectCreateData.location || !projectCreateData.developer || !projectCreateData.description || !projectCreateData.startingFrom || !projectCreateData.currency || !projectCreateData.email || !projectCreateData.phone) {
                toast.error('Filed are all mandatory...');
                return;
            }

            const formData = new FormData();
            formData.append('name', projectCreateData.name);
            formData.append('location', projectCreateData.location);
            formData.append('developer', projectCreateData.developer);
            formData.append('description', projectCreateData.description);
            formData.append('startingFrom', projectCreateData.startingFrom);
            formData.append('specifications', projectCreateData.specifications);
            formData.append('currency', projectCreateData.currency);
            formData.append('email', projectCreateData.email);
            formData.append('phone', projectCreateData.phone);
            formData.append('city', projectCreateData.city);
            formData.append('content', projectCreateData.content);


            formData.append('floorName', floorchips);
            formData.append('amenitiesName', amenitiechips);

            for (let i = 0; i < galleryImages.length; i++) {
                formData.append('gallery', galleryImages[i].file);
            }
            for (let i = 0; i < galleryImages.length; i++) {
                formData.append('floorPlan', floorImages[i].file);
            }
            for (let i = 0; i < galleryImages.length; i++) {
                formData.append('amenities', amenitieImages[i].file);
            }
            console.log(formData);

            const res = await dispatch(createNewProject(formData));
            // console.log(res);
            setProjectCreateData({
                name: '',
                location: '',
                developer: '',
                description: '',
                specifications: '',
                startingFrom: '',
                currency: '',
                email: '',
                phone: '',
                city: '',
            })
            setLoading(false);

        } catch (Error) {
            console.log(Error);
            throw Error;
        }
    }


    return (
        <AdminLayout>
            {/* <div  dangerouslySetInnerHTML={{ __html: projectCreateData.description }}></div> */}
            <div className='flex justify-center items-center min-h-screen'>
                {
                    loading
                        ? (<Spinner />)
                        : (
                            <div className='w-full min-h-[500px] rounded shadow-sm'>
                                <form className='' onSubmit={onFormSubmit}>
                                    <Link onClick={() => navigate(-1)}><FaArrowLeftLong /></Link>
                                    <h2 className='text-3xl font-mono mt-3 border-b'>
                                        {
                                            editProject ? 'Update Project' : 'Create Project'
                                        }
                                    </h2>
                                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                                        <div className='col-span-2'>
                                            <div className='my-3 flex flex-col gap-2'>
                                                <label htmlFor='name'>Name<sup className='text-pink-400'>*</sup></label>
                                                <input
                                                    type='text'
                                                    name='name'
                                                    id='name'
                                                    className='w-full py-3 px-3 rounded border outline-0'
                                                    value={projectCreateData.name}
                                                    placeholder='Enter Project Name'
                                                    onChange={userInput}
                                                />
                                            </div>
                                            <div className='my-3 flex flex-col gap-2'>
                                                <label htmlFor='content'>Content<sup className='text-pink-400'>*</sup></label>
                                                <JoditEditor
                                                    type='text'
                                                    name='content'
                                                    id='content'
                                                    config={editorConfig}
                                                    className='min-h-[400px]'
                                                    value={projectCreateData.content}
                                                    placeholder='Enter Project Developer'
                                                    onChange={(data) => contantField_1(data)}
                                                    ref={editor}
                                                />
                                            </div>
                                            <div className='my-3 flex flex-col gap-2'>
                                                <label htmlFor='specifications'>Specifications<sup className='text-pink-400'>*</sup></label>
                                                <JoditEditor
                                                    type='text'
                                                    name='specifications'
                                                    id='specifications'
                                                    className=''
                                                    config={editorConfig}
                                                    value={projectCreateData.specifications}
                                                    placeholder='Enter Project Specifications'
                                                    onChange={(data) => contantField_2(data)}
                                                    ref={editor}
                                                />
                                            </div>
                                            <div className='my-3 flex flex-col gap-2'>
                                                <label htmlFor='description'>Description<sup className='text-pink-400'>*</sup></label>
                                                <textarea
                                                    type='text'
                                                    name='description'
                                                    id='description'
                                                    className='border resize-none h-[200px] p-4 placeholder:text-2xl'
                                                    value={projectCreateData.description}
                                                    onChange={userInput}
                                                    placeholder='Enter Project Description'
                                                />
                                            </div>
                                        </div>
                                        <div className='col-span-1'>
                                            <div className='my-3 flex flex-col gap-2'>
                                                <label htmlFor='location'>Location<sup className='text-pink-400'>*</sup></label>
                                                <input
                                                    type='text'
                                                    id='location'
                                                    name='location'
                                                    className='w-full py-3 px-3 rounded border outline-0'
                                                    value={projectCreateData.location}
                                                    placeholder='Enter Project Location'
                                                    onChange={userInput}
                                                />
                                            </div>
                                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                                <div className='my-3 flex flex-col gap-2'>
                                                    <label htmlFor='developer'>Developer<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        id='developer'
                                                        name='developer'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        value={projectCreateData.developer}
                                                        placeholder='Enter Project Developer'
                                                        onChange={userInput}
                                                    />
                                                </div>
                                                <div className='my-3 flex flex-col gap-2'>
                                                    <label htmlFor='city'>City<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        name='city'
                                                        id='city'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        value={projectCreateData.city}
                                                        placeholder='Enter Project City'
                                                        onChange={userInput}
                                                    />
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                                <div className='my-3 flex flex-col gap-2'>
                                                    <label htmlFor='startingFrom'>StartingFrom<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        name='startingFrom'
                                                        id='startingFrom'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        value={projectCreateData.startingFrom}
                                                        placeholder='Enter Project StartingFrom'
                                                        onChange={userInput}
                                                    />
                                                </div>
                                                <div className='my-3 flex flex-col gap-2'>
                                                    <label htmlFor='currency'>Currency<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        name='currency'
                                                        id='currency'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        value={projectCreateData.currency}
                                                        placeholder='Enter Project Currency'
                                                        onChange={userInput}
                                                    />
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                                <div className='my-3 flex flex-col gap-2'>
                                                    <label htmlFor='email'>Email<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        name='email'
                                                        id='email'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        value={projectCreateData.email}
                                                        placeholder='Enter Project Email'
                                                        onChange={userInput}
                                                    />
                                                </div>
                                                <div className='my-3 flex flex-col gap-2'>
                                                    <label htmlFor='phone'>Phone<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        name='phone'
                                                        id='phone'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        value={projectCreateData.phone}
                                                        placeholder='Enter Project Phone'
                                                        onChange={userInput}
                                                    />
                                                </div>
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
                                                                <div key={idx} className='flex-row w-full h-[100px] outline-dashed p-1'>
                                                                    <img className='w-full h-full object-cover' src={galleryImage.dataURL} />
                                                                </div>
                                                            ))
                                                        )
                                                        :
                                                        (
                                                            <div className='flex capitalize flex-col items-center font-bold text-center justify-center w-full h-[100px] outline-dashed p-1'>
                                                                <CiCirclePlus className='font-bold text-2xl text-red-700' />
                                                                Gallery Image Add
                                                            </div>
                                                        )
                                                }
                                            </div>
                                            <div className='flex'>
                                                <div className='my-3 inline-block w-[50%]'>
                                                    <label htmlFor='floorImage' className='border px-3 py-2 cursor-pointer rounded'>
                                                        Floor Plan
                                                        <sup className='text-pink-400'>*</sup>
                                                    </label>
                                                    <input
                                                        type='file'
                                                        id='floorImage'
                                                        onChange={handelFloorPlanImage}
                                                        className='hidden'
                                                        accept='.jpg, .jpeg, .png, .svg'
                                                    />
                                                </div>
                                                <div className='w-[50%]'>
                                                    <label htmlFor='floorchips'>FLoor Plan Name<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        name='floorchips'
                                                        id='floorchips'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        // value={floorchips}
                                                        placeholder='Enter Project FLoor Plan Name'
                                                        onKeyDown={handelFloorKeyDown}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex gap-4 my-4'>
                                                {
                                                    floorImages.length != 0 ?
                                                        (
                                                            floorImages.map((floorImage, idx) => (
                                                                <div key={idx} className='flex-row w-[100px] mb-4 h-[100px] outline-dashed p-1'>
                                                                    <img className='w-full h-full object-cover' src={floorImage.dataURL} />
                                                                    <p className='text-xl font-mono text-center mt-2'>{floorchips[idx]}</p>
                                                                </div>
                                                            ))
                                                        )
                                                        :
                                                        (
                                                            <div className='flex capitalize flex-col items-center font-bold text-center justify-center w-full h-[100px] outline-dashed p-1'>
                                                                <CiCirclePlus className='font-bold text-2xl text-red-700' />
                                                                FLoor Plan Image
                                                            </div>
                                                        )
                                                }
                                            </div>
                                            <div className='flex'>
                                                <div className='my-3 inline-block w-[50%]'>
                                                    <label htmlFor='amenities' className='border px-3 py-2 cursor-pointer rounded'>
                                                        Amenities
                                                        <sup className='text-pink-400'>*</sup>
                                                    </label>
                                                    <input
                                                        type='file'
                                                        id='amenities'
                                                        onChange={handelAmenitiesImage}
                                                        className='hidden'
                                                        accept='.jpg, .jpeg, .png, .svg'
                                                    />
                                                </div>
                                                <div className='w-[50%]'>
                                                    <label htmlFor='amenitieschips'>Amenities Name<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        name='amenitieschips'
                                                        id='amenitieschips'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        // value={amenitiechips}
                                                        placeholder='Enter Project Amenities'
                                                        onKeyDown={handelAmenitieKeyDown}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex gap-4 my-4'>
                                                {
                                                    amenitieImages.length != 0 ?
                                                        (
                                                            amenitieImages.map((amenitieImage, idx) => (
                                                                <div key={idx} className='flex-row w-[100px] h-[100px] outline-dashed p-1'>
                                                                    <img className='w-full h-full object-cover' src={amenitieImage.dataURL} />
                                                                    <p className='text-xl font-mono text-center mt-2'>{amenitiechips[idx]}</p>
                                                                </div>
                                                            ))
                                                        )
                                                        :
                                                        (
                                                            <div className='flex capitalize flex-col items-center font-bold text-center justify-center w-full h-[100px] outline-dashed p-1'>
                                                                <CiCirclePlus className='font-bold text-2xl text-red-700' />
                                                                Amenities Image
                                                            </div>
                                                        )
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex justify-end'>
                                        <button
                                            type='submit'
                                            className='bg-red-400 text-xl w-[140px] inline-block text-white rounded h-[40px] mt-3 hover:bg-red-500 hover:scale-110 duration-300 ease-in-out transition-all'
                                        >
                                            {
                                                editProject ? 'Update Project' : 'Create Project'
                                            }
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )
                }
            </div>
        </AdminLayout>
    )
}

export default CreateProject;