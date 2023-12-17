import React, { FC, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import MovieCard from '../MovieCard';
import { IMovie } from 'src/interfaces';

import 'swiper/css';
import 'swiper/css/navigation';
import './SliderMovies.css';
import NotFind from '../NotFind';
import { useSelector } from 'react-redux';
import { getArrMoviesShow } from 'src/helpers';

const SliderMovies = () => {
    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.arrMovies);
    const movieTypeSelect: string = useSelector(({store}) => store.movieTypeSelect);
    const arrMoviesShow = getArrMoviesShow(arrMovies, movieTypeSelect)

    return (
    <>
        <Swiper
            speed={1000}
            navigation={true}
            breakpoints={{
                2000: {
                    // для разрешения больше 2000px
                    slidesPerView: 6.5,
                    slidesPerGroup: 4,
                    spaceBetween: 50,
                },
                1600: {
                    slidesPerView: 5.8,
                    slidesPerGroup: 4,
                    spaceBetween: 50,
                },
                1400: {
                    slidesPerView: 5.4,
                    slidesPerGroup: 4,
                    spaceBetween: 50,
                },
                1200: {
                    slidesPerView: 5,
                    slidesPerGroup: 4,
                    spaceBetween: 50,
                },
                1024: {
                    slidesPerView: 4.6,
                    slidesPerGroup: 3,
                    spaceBetween: 25,
                },
                900: {
                    slidesPerView: 3.7,
                    slidesPerGroup: 3,
                    spaceBetween: 20,
                },
                720: {
                    slidesPerView: 3.5,
                    slidesPerGroup: 3,
                    spaceBetween: 20,
                },
                600: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 20,
                },
                540: {
                    slidesPerView: 2.75,
                    slidesPerGroup: 2,
                    spaceBetween: 10,
                    speed: 800
                },
                0: {
                    slidesPerView: 'auto',
                    slidesPerGroup: 1,
                    spaceBetween: 10,
                    speed: 700
                },
            }}
            modules={[Autoplay, Navigation]}
            className="swiperMovies"
        >
            {arrMoviesShow.map((card: IMovie, i: number) => (
                <>
                <SwiperSlide key={i}>
                    <div className="slide__item">
                        <MovieCard obj={card} page='main' />
                    </div>
                </SwiperSlide>
                {i === arrMoviesShow.length - 1 && 
                    <SwiperSlide className='slide__not-find'>
                        <div>
                            <NotFind page='main' />
                        </div>
                    </SwiperSlide>
                }
                </>
            ))} 
        </Swiper>
    </>
    )
}

export default SliderMovies
