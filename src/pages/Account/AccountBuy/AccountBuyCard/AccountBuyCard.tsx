import React, { FC } from 'react'
import './AccountBuyCard.css'
import { IDataGiftCard, IDataGiftSelect, IDataMyCard } from 'src/interfaces'
import { useSelector } from 'react-redux'
import { compareDayNowEnd } from 'src/helpers'

interface IAccountBuyCard {
    obj: IDataMyCard
}

const AccountBuyCard:FC<IAccountBuyCard> = ({obj}) => {
    const arrGiftCards: IDataGiftCard[] = useSelector(({store}) => store.giftCards);

    const findObj = arrGiftCards.find((item) => obj.idCard === item.id);
    const image = (findObj) ? findObj.image : '';
    const cost = (findObj) ? findObj.cost : 0;

    const toodayMoreEnd = compareDayNowEnd(obj.end);
    if (toodayMoreEnd) obj.status = false;

    return (
        <div className='accountBuyCard'>
            <img src={image} className='accountBuyCard__image' alt="card" />
            <div className="accountBuyCard__info">
                <div className="accountBuyCard__cost-number">
                    <p className='accountBuyCard__cost'><span>{cost}</span> BYN</p>
                    <span className='accountBuyCard__number'>(#{obj.numberCard})</span>
                </div>
                <div className="accountBuyCard__period-status">
                    <div className="accountBuyCard__period">
                        <span className='accountBuyCard__start'>с: {obj.start}</span>
                        <span className='accountBuyCard__end'>до: {obj.end}</span>
                    </div>
                    <p className={`accountBuyCard__status ${!obj.status ? 'used' : ''}`}>{obj.status ? 'Активна' : 'Не активна'}</p>
                </div>
                <p className={`accountBuyCard__status ${!obj.status ? 'used' : ''}`}>{obj.status ? 'Активна' : 'Не активна'}</p>
            </div>
            
        </div>
    )
}

export default AccountBuyCard
