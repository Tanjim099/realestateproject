import React from 'react'
import { useSelector } from 'react-redux';

function GallerySection() {
    const { projects } = useSelector((state) => state.project);
  return (
    <div>
         <div className="border-b"> 
                    <div className="w-[1200px] mx-auto my-20">
                        <h2 className="text-4xl font-semibold text-[#7f1657] border-b-2 border-[#7f1657] pb-4 my-10">Gallery</h2>
                        <div className="grid grid-cols-4 gap-5">
                            {
                                projects && (
                                    projects.slice(0, 20).map((project, idx) => (
                                        <div key={idx} className="group col-span-1 relative">
                                            <img src={project?.gallery[0]?.secure_url} className="h-[200px] object-cover border" alt="Gallery" />
                                            <div className="bg-gray-50 opacity-0 hover:opacity-[.6] transition-all duration-300 ease-in-out h-full w-full absolute top-0 flex items-center justify-center">
                                                <h2 className="text-3xl text-black">{project?.name}</h2>
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