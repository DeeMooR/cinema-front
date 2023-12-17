import React, { FC, useState } from 'react'
import { IDataGiftCard, IDataGiftSelect } from 'src/interfaces'
import './BasketCard.css'

interface IBasketCard {
    obj: IDataGiftSelect
}

const BasketCard:FC<IBasketCard> = ({obj}) => {
    return (
        <div className='basketCard'>
            <div className="basketCard__left">
                <span className='basketCard__small-cost'>{obj.cost} byn</span>
                <span className='basketCard__number'>(#{obj.number})</span>
            </div>
            <div className="basketCard__right">
                <span className='basketCard__amount'>1</span>
                <span className='basketCard__big-cost'>{obj.cost}.00 BYN</span>
            </div>
        </div>
    )
}

export default BasketCard
