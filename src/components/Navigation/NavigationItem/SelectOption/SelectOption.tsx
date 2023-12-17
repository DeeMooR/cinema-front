import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getArrDate, getArrSelect, formateDateItem, getArrSoonDatesWithWeek, setDateStore } from 'src/helpers';
import './SelectOption.css'
import { IMovie } from 'src/interfaces';

interface ISelectOption {
    type: string,
    handleClick: (type: string) => void,
}

const SelectOption:FC<ISelectOption> = ({type, handleClick}) => {
    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.arrMovies);
    const [clickCheckbox, setClickCheckbox] = useState<string[]>([]);
    const movieTypeSelect: string = useSelector(({store}) => store.movieTypeSelect);
    const searchDate = useSelector(({store}) => store.search.date);

    const typeKey = useSelector(({store}) => store.search[type]);
    const dispatch = useDispatch();
    useEffect(() => {
        setClickCheckbox(typeKey);
    }, [typeKey]);

    const arrDate: string[] = (movieTypeSelect === 'already') ? getArrDate() : getArrSoonDatesWithWeek();
    console.log(arrDate)
    const arrSelect: string[] = getArrSelect(type);
    const arrShortLang: string[] = getArrSelect('shortLang');


    const idMovie = useSelector(({store}) => store.idActiveMoviePage);
    let movie = arrMovies[idMovie];
    const [arrMoviesDates, setArrMoviesDates] = useState<string[]>([]);
    
    useEffect(() => {
        const filterOutputDates = () => {
            const newArrMoviesDates = movie.schedule.map(item => item.date)
            .map(item => {
                for (let itemWithDayOfWeek of arrDate) {
                    if (itemWithDayOfWeek.split(', ')[1] === item) return itemWithDayOfWeek;
                }
                return '';
            })
            .filter(item => item !== '');
            setArrMoviesDates(newArrMoviesDates);
            if (searchDate === arrDate[0]) {
                console.log('set.first')
                setDateStore(newArrMoviesDates[0], dispatch);
            }
        }
        if (idMovie) filterOutputDates();
        else setArrMoviesDates(arrDate);
    },[idMovie, movieTypeSelect])

    const handleClickItem = (i: number) => {
        handleClick('');    // Скрывает slidebar после нажатия (1/2)
        dispatch({ type: "TOGGLE_NAV_ACTIVE", payload: '' });
        dispatch({ 
            type: "SET_SEARCH", 
            payload: {
                type: 'date', 
                data: arrMoviesDates[i]
            } 
        });
    }

    const handleClickCheckbox = (i: number, event: React.MouseEvent<HTMLLabelElement | HTMLSpanElement>) => {
        if (event.target === event.currentTarget) {
            setClickCheckbox(prevArr => {
                let newArr;
                if (type === 'language') {
                    if (prevArr.includes(arrShortLang[i])) newArr = prevArr.filter(item => item !== arrShortLang[i]);
                    else newArr = [...prevArr, arrShortLang[i]];
                } else {
                    if (prevArr.includes(arrSelect[i])) newArr = prevArr.filter(item => item !== arrSelect[i]);
                    else newArr = [...prevArr, arrSelect[i]];
                }
                dispatch({ 
                    type: "SET_SEARCH", 
                    payload: {
                        type: `${type}`, 
                        data: newArr
                    } 
                });
                return newArr;
            });
            handleClick('');    // Скрывает slidebar после нажатия (2/2)
            dispatch({ type: "TOGGLE_NAV_ACTIVE", payload: '' });
        }
    };
    
    return (
        <>
        {arrMoviesDates.length &&
            <div className='selectOption'>
                <div className="selectOption__text">
                    {type === 'date' ? (
                        <>
                        {arrMoviesDates.length ?
                            arrMoviesDates.map((item: string, i: number) => (
                                <p className={`selectOption__item ${typeKey === item ? 'active' : ''}`} onClick={() => handleClickItem(i)} key={i}>
                                    {typeKey === item ? '✔ ' : ''}{formateDateItem(item)}
                                </p>
                            ))
                            : 
                            <p className='selectOption__item'>Пусто</p>
                        }
                        </>
                    ) : (
                        <>
                        <p className='selectOption__title'>
                            {type === 'video' && 'Формат:'}
                            {type === 'audio' && 'Аудио:'}
                            {type === 'language' && 'Язык:'}
                        </p>
                        {arrSelect.map((item: string, i: number) => (
                            <>
                            {type === 'video' && i === 2 && <p className='selectOption__title'>Экран:</p>}
                            <label className='selectOption__choise' onClick={(event) => handleClickCheckbox(i, event)} key={i}>
                                {item}
                                <input type="checkbox" />
                                <span 
                                    className={`checkmark ${clickCheckbox.includes(arrSelect[i]) || clickCheckbox.includes(arrShortLang[i]) ? 'click' : ''}`} 
                                    onClick={(event) => handleClickCheckbox(i, event)} 
                                ></span>
                            </label>
                            </>
                        ))}
                        </>
                    )}
                </div>
            </div>
        }
        </>
    )
}

export default SelectOption
