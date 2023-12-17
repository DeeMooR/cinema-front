import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, A11y } from 'swiper/modules';
import SlideInfo from '../SlideInfo';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './SliderSwiper.css';
import { ISlide } from 'src/interfaces';
import { useSelector } from 'react-redux';

const SliderSwiper = () => {
    const arrSliderSwiper: ISlide[] = useSelector(({storePages}) => storePages.sliderSwiper);
    return (
    <>
        <Swiper 
            speed={800}
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation, Pagination, A11y]}
            className="swiperPosters"
        >
            {arrSliderSwiper.map((item, index) => (
                <SwiperSlide key={index} >
                    <SlideInfo slide={item} />
                </SwiperSlide>
            ))}
        </Swiper>
    </>
    )
}

export default SliderSwiper
