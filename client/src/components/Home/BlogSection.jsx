import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { FaCalendarAlt } from "react-icons/fa";
import { LuNewspaper } from "react-icons/lu";
import dateFormeter from '../../helper/dateFormeter';

function BlogSection() {

    const { blogData } = useSelector((state) => state?.blog);
    console.log(blogData);

    return (
        <div>
            <div className="mb-10 px-5 lg:p-0">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="text-3xl font-semibold text-[#7f1657] border-b-2 border-[#7f1657] pb-4 my-10">Recent Blog</h2>
                    <Swiper
                        //   navigation={{ nextEl, prevEl }}
                        slidesPerView={1}
                        spaceBetween={20}
                        loop={true}
                        autoplay={{ delay: 2000, disableOnInteraction: false }}
                        modules={[FreeMode, Pagination, Navigation, Autoplay]}
                        breakpoints={{
                            700: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                        }}
                        className="max-h-[30rem]"
                    >
                        {
                            blogData && blogData?.map((blog, i) => {
                                return (

                                    <SwiperSlide key={i} className="border w-[300px] md:min-w-[300px]">
                                        <NavLink to={`/blog/${blog.slug}`} onClick={() => navigate({ state: blog })}>
                                            <div className="w-full h-[200px]">
                                                <img src={blog?.image?.secure_url} className="h-full w-full object-cover" />
                                            </div>
                                            <div className="p-3">
                                                <h3 className="font-medium text-lg mt-1">{(blog?.title).substring(0, 45)}...</h3>
                                                <p className="text-sm text-gray-500">{(blog?.description).substring(0, 145)} <span className=" text-red-400 underline">more</span></p>
                                                {/* <p
                                                    dangerouslySetInnerHTML={{ __html: blog?.content }}
                                                    className="text-sm text-gray-500"
                                                /> */}
                                            </div>
                                            <hr />
                                            <div className='flex items-center justify-between p-2'>
                                                <div className='flex items-center gap-1  p-1 text-xs rounded-sm'>
                                                    <CgProfile />By
                                                    <p className='capitalize'>{blog?.author?.firstName || "Robin"}</p>
                                                </div>
                                                <div className='flex items-center gap-1  p-1 text-xs rounded-sm'>
                                                    <FaCalendarAlt />
                                                    <p>{dateFormeter(blog?.createdAt)}</p>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </SwiperSlide>

                                )
                            })
                        }
                        {/* <SwiperSlide className="border w-[300px]">
                                <div className="w-full">
                                    <img src={about_1} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-xl my-3">New Home Sales Picked Up in December</h3>
                                    <p className="text-lg text-gray-500">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="border w-[300px]">
                                <div className="w-full">
                                    <img src={about_1} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-xl my-3">New Home Sales Picked Up in December</h3>
                                    <p className="text-lg text-gray-500">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="border w-[300px]">
                                <div className="w-full">
                                    <img src={about_1} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-xl my-3">New Home Sales Picked Up in December</h3>
                                    <p className="text-lg text-gray-500">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="border w-[300px]">
                                <div className="w-full">
                                    <img src={about_1} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-xl my-3">New Home Sales Picked Up in December</h3>
                                    <p className="text-lg text-gray-500">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="border w-[300px]">
                                <div className="w-full">
                                    <img src={about_1} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-xl my-3">New Home Sales Picked Up in December</h3>
                                    <p className="text-lg text-gray-500">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="border w-[300px]">
                                <div className="w-full">
                                    <img src={about_1} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-xl my-3">New Home Sales Picked Up in December</h3>
                                    <p className="text-lg text-gray-500">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="border w-[300px]">
                                <div className="w-full">
                                    <img src={about_1} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-xl my-3">New Home Sales Picked Up in December</h3>
                                    <p className="text-lg text-gray-500">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="border w-[300px]">
                                <div className="w-full">
                                    <img src={about_1} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-xl my-3">New Home Sales Picked Up in December</h3>
                                    <p className="text-lg text-gray-500">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                </div>
                            </SwiperSlide> */}
                    </Swiper>

                </div>
            </div>
        </div>
    )
}

export default BlogSection