import React, { useEffect, useState } from 'react'
import PageTemplate from 'src/components/PageTemplate'
import HorizontalNews from 'src/components/HorizontalNews';
import SliderSwiper from 'src/components/SliderSwiper';
import SliderMovies from 'src/components/SliderMovies';
import { BackgroundSlider } from './styled';
import './Main.css'

import slider_background from "src/icons/afisha_background.svg"
import { getArrDate } from 'src/helpers';
import { IMovie, INews, ISlide } from 'src/interfaces';
import MainText from './MainText';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { GET_MAIN_NEWS, GET_MOVIES, GET_SLIDER_SWIPER } from 'src/actions/actions';

const Main = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const movieTypeSelect: string = useSelector(({store}) => store.movieTypeSelect);
    const arrSliderSwiper: ISlide[] = useSelector(({storePages}) => storePages.sliderSwiper);
    const arrMainNews: INews[] = useSelector(({storePages}) => storePages.mainNews);
    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.arrMovies);

    const isLoading = useSelector(({store}) => store.isLoading);
    const isLoadingPage = useSelector(({store}) => store.isLoadingPage);
    dispatch({ type: "CLEAR_SEARCH", payload: getArrDate()[0] });
    const [modal, setModal] = useState(<div/>);

    useEffect(() => {
        window.scrollTo({top: 0});
        dispatch({ type: "SET_MOVIE_TYPE_SELECT", payload: "already" });
        const fetchData = async () => {
            if (!arrMovies.length) {
                await dispatch({ type: "SET_LOADING_PAGE" });
                await dispatch(GET_MOVIES(setModal));
                if (!arrSliderSwiper.length) await dispatch(GET_SLIDER_SWIPER(setModal));
                await dispatch({ type: "SET_LOADING_PAGE" });

                await dispatch({ type: "SET_LOADING" });
                if (!arrMainNews.length) await dispatch(GET_MAIN_NEWS(setModal));
                dispatch({ type: "SET_LOADING" });
            } else {
                await dispatch({ type: "SET_LOADING_PAGE" });
                if (!arrSliderSwiper.length) await dispatch(GET_SLIDER_SWIPER(setModal));
                await dispatch({ type: "SET_LOADING_PAGE" });
                await dispatch({ type: "SET_LOADING" });
                if (!arrMainNews.length) await dispatch(GET_MAIN_NEWS(setModal));
                dispatch({ type: "SET_LOADING" });
            }
        };
        fetchData();
    },[])

    return (
        <>
        {modal}
        {isLoadingPage ? (
            <div className="loaderPage">
                <div className="loaderPage__element"></div>
            </div>
        ) : (
            <PageTemplate>
                <div className='main'>
                    <SliderSwiper />
                    <BackgroundSlider image={slider_background} className="main__afisha">
                        <div className="afisha-main__wrapper">
                            <h2 className="afisha-main__title">Афиша</h2>
                            <div className="afisha-main__buttons">
                                <div className="buttons__left">
                                    <a 
                                        className={`buttons__today ${movieTypeSelect === 'already' ? 'active' : ''}`} 
                                        onClick={() => dispatch({ type: "SET_MOVIE_TYPE_SELECT", payload: 'already' })}
                                    >Сейчас в кино</a>
                                    <a 
                                        className={`buttons__soon ${movieTypeSelect === 'soon' ? 'active' : ''}`} 
                                        onClick={() => dispatch({ type: "SET_MOVIE_TYPE_SELECT", payload: 'soon' })}
                                    >Скоро</a>
                                </div>
                                <Link to='/afisha' className='buttons__afisha'>Расписание сеансов</Link>
                            </div>
                            <hr className="afisha-main__line" />
                        </div>
                        <SliderMovies />
                    </BackgroundSlider>
                    {isLoading ? (
                        <div className="loader">
                            <div className="loader__element"></div>
                        </div>
                    ) : (
                        <>
                        {arrMainNews.map((item: INews, index: number) => (
                            <div className="news__item" key={index}>
                                {index % 2 === 0
                                ? <HorizontalNews obj={item} page='main' />
                                : <HorizontalNews obj={item} page='main' reverse />
                                }
                            </div>
                        ))}
                        </>
                    )}
                    <MainText />
                </div>
            </PageTemplate>
        )}
        </>
    )
}

export default Main
