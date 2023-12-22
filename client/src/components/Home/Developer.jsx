import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from 'swiper/modules';
import { images } from '../../Constants/developerImage';

function Developer() {
    return (
        <div>
            <div className="max-w-[1200px] mx-auto my-14">
                <Swiper
                    slidesPerView={7}
                    spaceBetween={20}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    modules={[Autoplay]}
                    className='flex gap-2'
                >
                    {
                        images.map((image, idx) => (
                            <SwiperSlide key={idx}>
                                <div className='bg-[#7f1657] flex items-center justify-center p-2 rounded-md min-w-[100px]'>
                                    <img className='   w-full h-[60px] rounded-md cursor-pointer' src={image.url} alt='DeveloperImage' />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default Developer