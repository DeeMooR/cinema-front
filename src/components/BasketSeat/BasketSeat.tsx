import React, { FC, useState } from 'react'
import { IDataGiftCard, IDataGiftSelect, IDataSeatSelect, IMovie, ISeance, ISeatType } from 'src/interfaces'
import './BasketSeat.css'

import cross from "src/icons/cross.svg"
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { REMOVE_SEAT_SELECT } from 'src/actions/actions'

interface IBasketSeat {
    obj: IDataSeatSelect,
    setModal: (v: JSX.Element) => void
}

const BasketSeat:FC<IBasketSeat> = ({obj, setModal}) => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const arrSeances: ISeance[] = useSelector(({storePages}) => storePages.arrSeances);
    const arrSeatTypes: ISeatType[] = useSelector(({storePages}) => storePages.seatTypes);
    const objSeatType = arrSeatTypes.find((item) => item.type === obj.typeSeat);
    const arrSeatSelect: IDataSeatSelect[] = useSelector(({store}) => store.seatSelect);
    const userId = useSelector(({store}) => store.user.id);

    const clickCross = () => {
        const newSeatSelect = arrSeatSelect.filter((item: IDataSeatSelect) => {
            return !(item.idSeance === obj.idSeance && item.row === obj.row && item.column === obj.column);
        });
        dispatch({ type: "REMOVE_SEAT_SELECT", payload: {idSeance: obj.idSeance, row: obj.row, column: obj.column }});
        const newArrSeances = arrSeances.map((seance) => {
            if (seance.id === obj.idSeance) {
                const updatedRows = [...seance.places];
                updatedRows[obj.row - 1][obj.column - 1] = 0;
                return {
                    ...seance,
                    places: updatedRows,
                };
            }
            return seance;
        });
        dispatch(REMOVE_SEAT_SELECT(userId, newArrSeances, newSeatSelect, setModal));
    }

    return (
        <div className='basketSeat'>
            <div className={`basketSeat__image ${obj.typeSeat}`}>
                <img src={objSeatType?.image} alt="seat" />
            </div>
            <div className="basketSeat__info">
                <div className="basketSeat__seat-cost">
                    <span className='basketSeat__seat'>{obj.row} ряд / {obj.column} место</span>
                    <span className='basketSeat__cost'>{obj.cost}.00 BYN</span>
                </div>
                <p className='basketSeat__type'>Тип места: <span>{obj.typeSeat}</span></p>
            </div>
            <img src={cross} className='basketSeat__cross' onClick={clickCross} alt="cross" />
        </div>
    )
}

export default BasketSeat
