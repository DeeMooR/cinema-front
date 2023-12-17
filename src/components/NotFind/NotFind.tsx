import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button'
import { formateDateItem, getArrDate, getArrSoonDatesWithWeek, setDateStore } from 'src/helpers';
import './NotFind.css'
import { useNavigate } from 'react-router-dom';

interface INotFind {
    page: 'afisha' | 'main'
}

const NotFind:FC<INotFind> = ({page}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const movieTypeSelect: string = useSelector(({store}) => store.movieTypeSelect);
    const [searchFilled, setSearchFilled] = useState(false);
    const search = useSelector(({store}) => store.search);

    const arrDate = (movieTypeSelect === 'already') ? getArrDate() : getArrSoonDatesWithWeek();
    const indexArrDay = arrDate.indexOf(search.date);
    let showNextDay;
    if (indexArrDay !== arrDate.length - 1) showNextDay = formateDateItem(arrDate[indexArrDay + 1]);
    else showNextDay = formateDateItem(arrDate[0]);
    
    useEffect(() => {
        if ((search.date === getArrDate()[0] || search.date === getArrSoonDatesWithWeek()[0]) && !search.video.length && !search.audio.length && !search.language.length) setSearchFilled(false);
        else setSearchFilled(true);
    }, [search])

    const clearSearch = () => {
        dispatch({ type: "CLEAR_SEARCH", payload: arrDate[0] });
    }
    const setNextDay = () => {
        if (indexArrDay !== arrDate.length - 1) setDateStore(arrDate[indexArrDay + 1], dispatch);
        else setDateStore(arrDate[0], dispatch);
    }

    const clickSoon = () => {
        navigate('/afisha');
        dispatch({ type: "SET_MOVIE_TYPE_SELECT", payload: "soon" });
    }
    const clickAlready = () => {
        navigate('/afisha');
        dispatch({ type: "SET_MOVIE_TYPE_SELECT", payload: "already" });
    }

    
    return (
        <div className={`not-find ${page === 'main' ? 'not-find-small' : ''}`}>
            <h2 className='not-find__text'>Не нашли фильм?</h2>
            {page === 'main' 
            ? <Button color='white' handleClick={clickAlready} becomeSmall>Все фильмы</Button>
            : <Button color='white' handleClick={setNextDay}>{showNextDay}</Button>
            }
            {movieTypeSelect === "already"
            ? <Button color="white" becomeSmall={page === "main" && true} handleClick={clickSoon} >Скоро в кино</Button>
            : page === 'afisha' && <Button color='white' handleClick={clickAlready}>Сейчас в кино</Button>
            }
            {searchFilled && 
                <Button color='red' isMin handleClick={clearSearch}>Очистить фильтры</Button>
            }
        </div>
    )
}

export default NotFind
