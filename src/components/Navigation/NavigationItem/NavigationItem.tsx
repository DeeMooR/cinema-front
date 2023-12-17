import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SelectOption from './SelectOption';
import { getArrDate, formateDateItem, getFullLanguage, getArrSoonDatesWithWeek } from 'src/helpers';
import './NavigationItem.css'

import arrow from "../../../icons/arrow-button.png"

interface INavigationItem {
    icon: string,
    text?: string,
    type: string,
    navActive: string,
    handleClick: (type: string) => void
}

const NavigationItem:FC<INavigationItem> = ({icon, text, type, navActive, handleClick}) => {
    const searchDate = useSelector(({store}) => store.search.date);
    let searchArr = useSelector(({store}) => store.search[type]);
    const movieTypeSelect: string = useSelector(({store}) => store.movieTypeSelect);

    if (type === 'language') {
        searchArr = searchArr.map((item: string) => getFullLanguage(item))
    }

    return (
        <>
        <div className="navigationItem" onClick={() => handleClick(type)}>
            <img src={icon} className="navigationItem__image" alt="icon" />
            <p className="navigationItem__text">
                {type === 'date' ? formateDateItem(searchDate) :
                    (searchArr.length !== 0 ? searchArr.join(', ') : text)
                }
            </p>
            <img src={arrow} className={`navigationItem__arrow ${navActive == type && 'rotate'}`} alt="arrow" />
        </div>
        <div className={`navigationItem__choise-block ${navActive == type ? 'show' : ''}`}>
            <SelectOption type={type} handleClick={handleClick} />
        </div>
        </>
    );
}

export default NavigationItem
