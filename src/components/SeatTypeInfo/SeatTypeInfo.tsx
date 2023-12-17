import React, { FC } from 'react'
import './SeatTypeInfo.css'
import { ISeatType } from 'src/interfaces';
import { useSelector } from 'react-redux';

interface ISeatTypeInfo {
    typeAndCost: {type: string, cost: number}
}

const SeatTypeInfo:FC<ISeatTypeInfo> = ({typeAndCost}) => {
    const arrSeatTypes: ISeatType[] = useSelector(({storePages}) => storePages.seatTypes);
    const objType = arrSeatTypes.find((item: ISeatType) => item.type === typeAndCost.type); 
    
    return (
        <>
        {objType &&
            <div className='seatTypeInfo'>
                <div className={`seatTypeInfo__image ${objType.type}`}>
                    <img src={objType.image} alt="seat" />
                </div>
                <div className="seatTypeInfo__info">
                    <div className="seatTypeInfo__title-cost">
                        <p className='seatTypeInfo__title'>{objType.type}</p>
                        <p className='seatTypeInfo__cost'>{typeAndCost.cost}.00 BYN</p>
                    </div>
                    <p className='seatTypeInfo__description'>{objType.description}</p>
                </div>
            </div>
        }
        </>
    )
}

export default SeatTypeInfo
