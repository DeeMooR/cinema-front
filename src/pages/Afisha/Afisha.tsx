import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageTemplate from 'src/components/PageTemplate'
import MovieCard from 'src/components/MovieCard'
import NotFind from 'src/components/NotFind'
import Navigation from 'src/components/Navigation'
import { IMovie, INews, ISeance } from 'src/interfaces'
import './Afisha.css'
import TitleWithSwitch from 'src/components/TitleWithSwitch'
import { Link } from 'react-router-dom'
import HorizontalNews from 'src/components/HorizontalNews'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { GET_AFISHA_NEWS, GET_MOVIES, GET_SEANCES } from 'src/actions/actions'
import { getArrDate, getArrMoviesShow, getArrSoonDatesWithWeek, setDateStore } from 'src/helpers'

const Afisha = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const arrAfishaNews: INews[] = useSelector(({storePages}) => storePages.afishaNews);
    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.arrMovies);
    const arrSeances: ISeance[] = useSelector(({storePages}) => storePages.arrSeances);
    const [modal, setModal] = useState(<div/>);
    const isLoading = useSelector(({store}) => store.isLoading);
    const isLoadingPage = useSelector(({store}) => store.isLoadingPage);
    
    const fullSearchDate = useSelector(({store}) => store.search.date);
    const searchDate = fullSearchDate.split(', ')[1]

    const searchVideo = useSelector(({store}) => store.search.video);
    const searchAudio = useSelector(({store}) => store.search.audio);
    let searchLanguage = useSelector(({store}) => store.search.language);


    const movieTypeSelect: string = useSelector(({store}) => store.movieTypeSelect);
    const arrMoviesShow = getArrMoviesShow(arrMovies, movieTypeSelect);
    const [activePage, setActivePage] = useState(0);
    useEffect(() => {
        if (movieTypeSelect === 'already') setActivePage(1);
        else setActivePage(2);
    },[])

    useEffect(() => {
        if (movieTypeSelect === 'already' && getArrSoonDatesWithWeek().includes(fullSearchDate)) {
            setDateStore(getArrDate()[0], dispatch)
            setActivePage(1);
        }
        if (movieTypeSelect === 'soon' && getArrDate().includes(fullSearchDate)) {
            setDateStore(getArrSoonDatesWithWeek()[0], dispatch)
            setActivePage(2);
        }
    },[movieTypeSelect])

    dispatch({ type: "SET_ID_ACTIVE_MOVIE_PAGE", payload: '' });
    
    let filteredMovies: IMovie[] = [];
    let filterOne: IMovie[];
    let addToFilterOne: IMovie[];
    

    useEffect(() => {
        window.scrollTo({top: 0});
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
            if (!arrAfishaNews.length) {
                await dispatch({ type: "SET_LOADING" });
                await dispatch(GET_AFISHA_NEWS(setModal));
                dispatch({ type: "SET_LOADING" });
            }
        };
        fetchData();
    },[])
    
    const filterMovies = () => {
        // Фильтрация фильмов по параметру Date
        filteredMovies = arrMoviesShow.filter(movie => {
            return movie.schedule.some(oneDay => oneDay.date === searchDate);
        })

        // Фильтрация фильмов по критерию 2D и 3D
        if (searchVideo.includes('2D') || searchVideo.includes('3D')) {
            filterOne = [];
            for (const item of searchVideo) {
                switch (item) {
                case '2D':
                    addToFilterOne = filteredMovies.filter(movie => movie.video === '2D');
                    filterOne.push(...addToFilterOne);
                    break;
                case '3D':
                    addToFilterOne = filteredMovies.filter(movie => movie.video === '3D');
                    filterOne.push(...addToFilterOne);
                    break;
                }
            }
            filteredMovies = [...filterOne];
        }

        // Фильтрация фильмов по параметру Audio
        if (searchAudio.length) {
            filterOne = [];
            for (const item of searchAudio) {
                switch (item) {
                case 'Dolby Digital':
                    addToFilterOne = filteredMovies.filter(movie => {
                        if (filterOne.some(item => item.title === movie.title)) return false;
                        let scheduleDay = movie.schedule.find(item => item.date == searchDate);
                        const allSeances = arrSeances.filter((seance) => scheduleDay?.seances.includes(seance.id));
                        if (allSeances) return allSeances.some(oneSeance => [1, 2].includes(oneSeance.room));
                        return false;
                    });
                    filterOne.push(...addToFilterOne);
                    break;
                case 'Dolby Atmos':
                    addToFilterOne = filteredMovies.filter(movie => {
                        if (filterOne.some(item => item.title === movie.title)) return false;
                        let scheduleDay = movie.schedule.find(item => item.date == searchDate);
                        const allSeances = arrSeances.filter((seance) => scheduleDay?.seances.includes(seance.id));
                        if (allSeances) return allSeances.some(oneSeance => [3, 4].includes(oneSeance.room));
                        return false;
                    });
                    filterOne.push(...addToFilterOne);
                    break;
                case 'Harman Kardon':
                    addToFilterOne = filteredMovies.filter(movie => {
                        if (filterOne.some(item => item.title === movie.title)) return false;
                        let scheduleDay = movie.schedule.find(item => item.date == searchDate);
                        const allSeances = arrSeances.filter((seance) => scheduleDay?.seances.includes(seance.id));
                        if (allSeances) return allSeances.some(oneSeance => [5, 6].includes(oneSeance.room));
                        return false;
                    });
                    filterOne.push(...addToFilterOne);
                    break;
                }
            }
            filteredMovies = [...filterOne];
        } 

        // Фильтрация фильмов если выбран тип экрана
        if (searchVideo.includes('ScreenX') || searchVideo.includes('IMAX')) {
            if (!searchAudio.length || searchAudio.includes('Harman Kardon')) {
                filterOne = [];
                for (const item of searchVideo) {
                    switch (item) {
                    case 'ScreenX':
                        addToFilterOne = filteredMovies.filter(movie => {
                            if (filterOne.some(item => item.title === movie.title)) return false;
                            let scheduleDay = movie.schedule.find(item => item.date == searchDate);
                            const allSeances = arrSeances.filter((seance) => scheduleDay?.seances.includes(seance.id));
                            if (allSeances) return allSeances.some(oneSeance => oneSeance.room === 5);
                            return false;
                        });              
                        filterOne.push(...addToFilterOne);
                        break;
                    case 'IMAX':
                        addToFilterOne = filteredMovies.filter(movie => {
                            if (filterOne.some(item => item.title === movie.title)) return false;
                            let scheduleDay = movie.schedule.find(item => item.date == searchDate);
                            const allSeances = arrSeances.filter((seance) => scheduleDay?.seances.includes(seance.id));
                            if (allSeances) return allSeances.some(oneSeance => oneSeance.room === 6);
                            return false;
                        });
                        filterOne.push(...addToFilterOne);
                        break;
                    }
                }
                filteredMovies = [...filterOne];
            } else {
                filteredMovies = [];
            }
        }

        // Фильтрация фильмов по критерий SUB
        if (searchLanguage.includes('SUB')) {
            filteredMovies = filteredMovies.filter(movie => movie.isSUB === true);
        }

        // Фильтрация фильмов по параметру Language
        if (searchLanguage.length) {
            filterOne = [];
            for (const item of searchLanguage) {
                switch (item) {
                case 'RU':
                    addToFilterOne = filteredMovies.filter(movie => movie.language === 'RU');
                    filterOne.push(...addToFilterOne);
                    break;
                case 'ENG':
                    addToFilterOne = filteredMovies.filter(movie => movie.language === 'ENG');
                    filterOne.push(...addToFilterOne);
                    break;
                case 'BEL':
                    addToFilterOne = filteredMovies.filter(movie => movie.language === 'BEL');
                    filterOne.push(...addToFilterOne);
                    break;
                }
            }

            if (searchLanguage.join(',') !== 'SUB') filteredMovies = [...filterOne];
        }
    }
    filterMovies();
    
    return (
        <>
        {modal}
        {isLoadingPage ? (
            <div className="loaderPage">
                <div className="loaderPage__element"></div>
            </div>
        ) : (
            <PageTemplate>
                <div className='afisha'>
                    <div className="afisha__wrapper">
                        <TitleWithSwitch title='Афиша кино' switch_1='Сейчас в кино' switch_2='Скоро' active={activePage} setActive={setActivePage} />
                        <div className='afisha__navigation'>
                            <Navigation />
                        </div>
                        <div className='afisha__cards'>
                            {filteredMovies.map((card: IMovie, i: number) => (
                                <div className="cards__item" key={i}>
                                    <MovieCard obj={card} page='afisha' />
                                </div>
                            ))}
                            <div className={`cards__item
                                ${filteredMovies.length % 4 === 0 && "center-4"}
                                ${filteredMovies.length % 3 === 0 && "center-3"}
                                ${filteredMovies.length % 2 === 0 && "center-2"}
                            `}>
                                <NotFind page='afisha' />
                            </div>
                        </div>
                        <div className="afisha__text">
                            <p>Кинопространства mooon и Silver Screen представляет Вам киноафишу всех фильмов, идущих в нашей <Link to='/'>сети кинотеатров</Link>.</p>
                            <p>Наша киноафиша познакомит Вас с премьерами мировой киноиндустрии, расскажет о новинках кино для детей и взрослых и пригласит на показ любимых ретроспективных картин. Предлагаем Вам насладиться лучшими моментами вышедших в прокат фильмов, ознакомиться с трейлерами и полной информацией о кинолентах: продолжительности, рейтинге, создателях, актерском составе.</p>
                            <p>Мы предлагаем Вам ознакомиться с киноафишей на нашем сайте, посмотреть, что идет в кино в Минске и в Гродно сегодня и купить билеты онлайн в кинотеатры Silver Screen и mooon, не выходя из дома.</p>
                            <p>Доставьте себе удовольствие от просмотра своих любимых фильмов! Ждем Вас у нас в кинопространствах mooon и Silver Screen!</p>
                        </div>
                    </div>
                    {isLoading ? (
                        <div className="loader">
                            <div className="loader__element"></div>
                        </div>
                    ) : (
                        <HorizontalNews obj={arrAfishaNews[0]} page='main' reverse />
                    )}
                </div>
            </PageTemplate>
        )}
        </>
    );
}

export default Afisha
