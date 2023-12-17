import React, { FC, useEffect, useState } from 'react'
import { IDataGiftCard, IDataGiftSelect, ISlide } from 'src/interfaces'
import './GiftCard.css'

import plus from "src/icons/plus.png"
import minus from "src/icons/minus.png"
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { ADD_GIFT_SELECT } from 'src/actions/actions'

interface IGiftCard {
    obj: IDataGiftCard,
    arrGiftCards: IDataGiftCard[]
}

const GiftCard:FC<IGiftCard> = ({obj, arrGiftCards}) => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();

    const arrGiftSelect: IDataGiftSelect[] = useSelector(({store}) => store.giftSelect);
    const [amountSelect, setAmountSelect] = useState(0);
    const [modal, setModal] = useState(<div/>);
  
    useEffect(() => {
        if (!arrGiftSelect.length) setAmountSelect(0);
    }, [arrGiftSelect])

    const clickMinus = () => {
        if (amountSelect > 0) {
            setAmountSelect(amountSelect - 1);
            dispatch({ type: "REMOVE_GIFT_SELECT", payload: obj.id });
        }
    }
    const clickPlus = () => {
        setAmountSelect(amountSelect + 1);
        const objForGiftSelect: IDataGiftSelect = {
            idCard: obj.id,
            number: obj.amount + 1,
            cost: obj.cost
        };
        let arrWithNewAmount = arrGiftCards.map((item) => {
            if (item.id === obj.id) {
              return {
                ...item,
                amount: item.amount + 1,
              };
            }
            return item;
        });
        dispatch(ADD_GIFT_SELECT(arrWithNewAmount, objForGiftSelect, setModal));
    }

    return (
        <div className='giftCard'>
            {modal}
            <img src={obj.image} className='giftCard__image' alt="giftCard" />
            <div className="giftCard__info">
                <p className='giftCard__title'>Подарочная карта</p>
                <div className="giftCard__choise">
                    <img src={minus} className='giftCard__minus' alt="minus" onClick={clickMinus} />
                    <p className='giftCard__amount'>{amountSelect}</p>
                    <img src={plus} className='giftCard__plus' alt="plus" onClick={clickPlus} />
                </div>
                <p className='giftCard__cost'>{obj.cost} BYN</p>
            </div>
        </div>
    )
}

export default GiftCard
