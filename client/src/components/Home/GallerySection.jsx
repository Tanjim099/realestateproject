import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useSelector } from 'react-redux';
import '../../styles/GalleryStyle.css'

function GallerySection() {
    const { projects } = useSelector((state) => state.project);

    const [model, setModel] = useState(false);
    const [tempingSrc, setTempingSrc] = useState('');

    const getImage = (image) => {
        setTempingSrc(image);
        setModel(true);
    }

    return (
        <div>
            <div className={`${model ? "model open" : "model"}`}>
                <img src={tempingSrc} alt='GalleryImage' />
                <span onClick={() => setModel(false)} className='text-white cursor-pointer absolute top-5 right-4 text-4xl'><IoMdClose /></span>
            </div>
            <div className="border-b">
                <div className="w-[1200px] mx-auto my-10">
                    <h2 className="text-4xl font-semibold text-[#7f1657] border-b-2 border-[#7f1657] pb-4 my-10">Gallery</h2>
                    <div className="grid grid-cols-5 gap-5">
                        {
                            projects && (
                                projects.slice(0, 20).map((project, idx) => (
                                    <div onClick={() => getImage(project.gallery[0]?.secure_url)} key={idx} className="group col-span-1 relative">
                                        <img src={project?.gallery[0]?.secure_url} className="h-[180px] w-full object-cover border" alt="Gallery" />
                                        <div className="bg-gray-50 opacity-0 hover:opacity-[.6] transition-all duration-300 ease-in-out h-full w-full absolute top-0 flex items-center justify-center">
                                            <h2 className="text-sm text-black">{project?.name}</h2>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GallerySection