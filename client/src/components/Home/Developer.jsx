import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from 'swiper/modules';
import { images } from '../../Constants/developerImage';

function Developer() {
    return (
        <div>
            <div className="max-w-[1200px] mx-auto mb-24">
                <Swiper
                    slidesPerView={5}
                    spaceBetween={20}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    modules={[Autoplay]}
                >
                    {
                        images.map((image, idx) => (
                            <SwiperSlide key={idx}>
                                <img className='w-[100px] h-[50px]' src={image.url} alt='DeveloperImage' />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default Developer