import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import Project from '../Project';
import { useSelector } from 'react-redux';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';

function TopProjects() {

    const [nextEl, setNextEl] = useState(null);
    const [prevEl, setPrevEl] = useState(null);
    const { projects } = useSelector((state) => state.project);
    // console.log(projects);
    const classNames = 'hover:bg-dry absolute flex items-center justify-center transitions text-sm rounded w-8 h-8 flex-colo bg-[#7f1657] text-white';

    return (
        <div>
            <div className='mt-14 w-[90%] md:w-[95%] lg:w-[80%] relative mx-auto'>
                <h2 className="border-b-2 border-[#7f1657] pb-4 my-10 text-[22px] lg:text-3xl text-[#7f1657] font-[600] lg:font-semibold">
                    Top Projects
                </h2>
                <Swiper
                    navigation={{ nextEl, prevEl }}
                    slidesPerView={1}
                    spaceBetween={10}
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
                        projects && (
                            projects.map((data, idx) => (
                                <SwiperSlide key={idx} className='md:min-w-[300px]'>
                                    <Project data={data} />
                                </SwiperSlide>
                            ))
                        )
                    }
                </Swiper>
                {
                    projects && projects.length > 4 && (
                        <div className='flex justify-between gap-10'>
                            <button
                                className={`${classNames} top-[50%] left-[-3%] z-10`}
                                ref={(node) => setPrevEl(node)}
                            >
                                <BsCaretLeftFill />
                            </button>
                            <button
                                className={`${classNames} right-[-3%] top-[50%] z-10`}
                                ref={(node) => setNextEl(node)}
                            >
                                <BsCaretRightFill />
                            </button>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default TopProjects