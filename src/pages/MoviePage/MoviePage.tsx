import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from 'src/components/Navigation';
import Schedule from 'src/components/Schedule';
import Modal from 'src/components/Modal';
import { getArrDate, setDateStore, getArrDates7Days, getArrSoonDatesWithWeek } from 'src/helpers';
import { StyledTrailer } from './styled'
import { IMovie, ISeance } from 'src/interfaces';
import './MoviePage.css'

import iconPlay from "src/icons/play.png"
import PageMovieTemplate from 'src/components/PageMovieTemplate';
import { GET_MOVIES, GET_SEANCES } from 'src/actions/actions';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const MoviePage = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const [isModal, setIsModal] = useState(false);
    let { id = '' } = useParams<{ id: string }>();

    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.arrMovies);
    const arrSeances: ISeance[] = useSelector(({storePages}) => storePages.arrSeances);
    const searchDate = useSelector(({store}) => store.search.date);
    const movie = arrMovies[+id] || null;
    
    useEffect(() => {
        if (movie) {
            const isAlready = movie?.schedule.some((item) => getArrDates7Days().includes(item.date));
            console.log(isAlready)
            if (searchDate === getArrDate()[0]) {
                if (isAlready) {
                    dispatch({ type: "SET_MOVIE_TYPE_SELECT", payload: 'already' });
                    setDateStore(getArrDate()[0], dispatch);
                } else {
                    dispatch({ type: "SET_MOVIE_TYPE_SELECT", payload: 'soon' });
                    setDateStore(getArrSoonDatesWithWeek()[0], dispatch);
                }
            }
        }
    }, [movie])

    const [modal, setModal] = useState(<div/>);
    const isLoadingPage = useSelector(({store}) => store.isLoadingPage);

    useEffect(() => {
        if (id) dispatch({ type: "SET_ID_ACTIVE_MOVIE_PAGE", payload: id });
        const fetchData = async () => {
            if (!arrSeances.length) {
                if (!arrMovies.length) {
                    await dispatch({ type: "SET_LOADING_PAGE" });
                    await dispatch(GET_MOVIES(setModal));
                    await dispatch(GET_SEANCES(setModal));
                    await dispatch({ type: "SET_LOADING_PAGE" });
                } else {
                    await dispatch({ type: "SET_LOADING_PAGE" });
                    await dispatch(GET_SEANCES(setModal));
                    await dispatch({ type: "SET_LOADING_PAGE" });
                }
            }
        };
        fetchData();
    }, []);

    const location = useLocation();
    let customBackStr;
    if (location.state && location.state.fromPage === '/buy-ticket') customBackStr = '/afisha';
    else if (!location.state) customBackStr = '/';
    else customBackStr = '';


    let fullFirstDate;
    if (location.state && location.state.fromPage === 'main') {
        fullFirstDate = getArrDate().find(item => {
            if (movie && movie.schedule[0].date === item.split(', ')[1]) return true;
            return false;
        });
    }
    if (fullFirstDate) setDateStore(fullFirstDate, dispatch);
    
    let videoId, newDuration;
    if (movie) {
        videoId = movie.trailer.split("v=")[1];
        newDuration = `${Math.floor(movie.duration / 60)} ч ${movie.duration % 60} мин`;
    }
    const trailerImage = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
        <>
        {modal}
        {(isLoadingPage || !arrMovies.length) ? (
            <div className="loaderPage">
                <div className="loaderPage__element"></div>
            </div>
        ) : (
            <PageMovieTemplate movie={movie} customBack={customBackStr}>
                <div className='moviePage'>
                    <Navigation />
                    <div className="moviePage__content">
                        <article className="content__article">
                            <section className='content__movie'>
                                <img src={movie.image} className='content__image' alt="poster" />
                                <article className='content__text'>
                                    <h3>{movie.title}</h3>
                                    <p className='content__other'>
                                        <span>{movie.genres.join(', ')}</span> /
                                        <span>{movie.age}+</span> /
                                        <span>{newDuration}</span>
                                        </p>
                                </article> 
                            </section>
                            <section className='content__schedule'>
                                <Schedule movie={movie} />
                            </section>
                        </article>
                        <aside className="content__aside">
                            <StyledTrailer video={trailerImage} play={iconPlay} onClick={() => setIsModal(true)}></StyledTrailer>
                            <div className="content__description">{movie.description}</div>
                        </aside>
                    </div>
                </div>
                <Modal movie={movie} isModal={isModal} setIsModal={setIsModal} />
            </PageMovieTemplate>
        )}
        </>
    )
}

export default MoviePage
