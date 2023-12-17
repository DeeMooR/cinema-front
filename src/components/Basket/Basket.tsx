import React, { FC } from 'react'
import './Basket.css'
import { useSelector } from 'react-redux';
import { IDataGiftSelect, IDataSeatSelect } from 'src/interfaces';
import BasketSeat from '../BasketSeat/BasketSeat';
import BasketCard from '../BasketCard';

interface IBasket {
    type: 'card' | 'seat',
    setModal: (v: JSX.Element) => void

}

const Basket:FC<IBasket> = ({type, setModal}) => {
    const arrGiftSelect = useSelector(({store}) => store.giftSelect);
    const arrSeatSelect = useSelector(({store}) => store.seatSelect);

    const sumCards = arrGiftSelect.reduce((acc: number, item: IDataGiftSelect) => {
        return acc + item.cost;
    }, 0);
    const sumSeats = arrSeatSelect.reduce((acc: number, item : IDataSeatSelect) => {
        return acc + item.cost;
    }, 0);
    const totalCost = (type === 'card') ? sumCards : sumSeats;
    const arr = (type === 'card') ? arrGiftSelect : arrSeatSelect;

    return (
        <div className='basket'>
            <div className="basket__items">
                {arr.map((item: IDataGiftSelect | IDataSeatSelect, index: number) => (
                    <div className="basket__item" key={index}>
                        {type === 'card' && <BasketCard obj={item as IDataGiftSelect} />}
                        {type === 'seat' && <BasketSeat obj={item as IDataSeatSelect} setModal={setModal} />}
                        
                    </div>
                ))}
            </div>
            <div className='basket__total'>
                <span className='basket-total__text'>Итого:</span>
                <span className='basket-total__sum'>{totalCost}.00 BYN</span>
            </div>
        </div>
    )
}

export default Basket
