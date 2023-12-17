import React, { FC, useEffect } from 'react'
import './AccountBuyTicket.css'
import { IDataGiftCard, IDataGiftSelect, IDataMyCard, IDataSeatSelect, IMovie, ISeance } from 'src/interfaces'
import { useSelector } from 'react-redux'
import { compareTimeNowStart, getAudio, getTimePlusDuration, getTodayDayMonthYear } from 'src/helpers'

interface IAccountBuyTicket {
    obj: IDataSeatSelect
}

const AccountBuyTicket:FC<IAccountBuyTicket> = ({obj}) => {
    const arrMovies: IMovie[] = useSelector(({storePages}) => storePages.arrMovies);
    const arrSeances: ISeance[] = useSelector(({storePages}) => storePages.arrSeances);

    const objMovie = arrMovies.find((item) => item.id === obj.idMovie);
    const objSeance = arrSeances.find((item) => item.id === obj.idSeance);

    let alreadyStart = false;
    if (objSeance && getTodayDayMonthYear() === obj.date) alreadyStart = compareTimeNowStart(objSeance?.time);

    return (
        <>
        {objMovie && objSeance &&
            <div className='accountBuyTicket'>
                <img src={objMovie?.image} className='accountBuyTicket__image' alt="movie" />
                <div className="accountBuyTicket__info">
                    <p className='accountBuyTicket__title'>{objMovie.title}</p>
                    <div className="accountBuyTicket__text">
                        <div className="accountBuyTicket__left">
                            <p className={`accountBuyTicket__date-time ${alreadyStart ? 'alreadyStart' : ''}`}>
                                {obj.date} / {objSeance.time} - {getTimePlusDuration(objSeance.time, objMovie.duration)}
                            </p>
                            <p className='accountBuyTicket__other'>
                                <span>{objMovie.language}{objMovie.isSUB && ', SUB'}</span>
                                <span>{objMovie.video}</span>
                                <span>{getAudio(objSeance.room)}</span>
                                <span className='accountBuyTicket__age'>{objMovie.age}+</span>
                            </p>
                        </div>
                        <div className="accountBuyTicket__middle">
                            <p className='accountBuyTicket__seat'>{obj.row} ряд, {obj.column} место / зал {objSeance.room}</p>
                            <p className='accountBuyTicket__type'>Тип места: <span>{obj.typeSeat}</span></p>
                        </div>
                        <p className='accountBuyTicket__cost'>{obj.cost} BYN</p>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default AccountBuyTicket
