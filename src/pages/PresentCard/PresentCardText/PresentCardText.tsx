import React from 'react'
import { Link } from 'react-router-dom'
import './PresentCardText.css'

const PresentCardText = () => {
    return (
        <div className='presentCardText'>
            <p className='presentCardText__title'>Условия приобретения и использования</p>
            <p className='presentCardText__subtitle'>Как купить электронную подарочную карту:</p>
            <ul className='presentCardText__list'>
                <ol className='presentCardText__item'><span>1.</span>Выберите дизайн и номинал карты: 50, 100, 150 byn.</ol>
                <ol className='presentCardText__item'><span>2.</span>Укажите свой e-mail для отправки подарочной карты (для незарегистрированных пользователей).</ol>
                <ol className='presentCardText__item'><span>3.</span>Оплатите карту online.</ol>
                <ol className='presentCardText__item'><span>4.</span>Подарок готов! Проверьте электронную почту, указанную при оплате или почту, на которую зарегистрирован личный кабинет</ol>
            </ul>
            <p className='presentCardText__subtitle'>Как работает электронная подарочная карта:</p>
            <p className='presentCardText__text'>
                Электронная подарочная карта действует в сети кинопространств mooon и Silver Screen, а также на сайте <Link to='/'>silverscreen.by</Link>
                <br /><br />
                При реализации можно использовать любую сумму, доступную на карте. Если стоимость билетов и/или товаров превышает баланс карты - можно доплатить разницу за счет собственных средств на кассе или сайте.
                <br /><br />
                Срок действия карты: 180 дней с момента покупки.
            </p>
            <p className='presentCardText__subtitle'>Как использовать карту:</p>
            <p className='presentCardText__text'>Для использования в кинопространстве необходимо предъявить карту (qr код) на кассе как основание для оплаты Для использования карты на сайте silverscreen.by, введите ее номер в соответствующее поле в момент выбора способа оплаты</p>
            <p className='presentCardText__subtitle'>Для юридических лиц:</p>
            <p className='presentCardText__text'>
                Заказать и оплатить карты в качестве подарка для команды вашей компании или для ключевых партнеров можно безналичным платежом по предварительной заявке в коммерческий отдел mooon и Silver Screen:
                <br />
                Почта <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sales@mooon.by" target='blank'>sales@mooon.by</a>
                </p>
        </div>
    )
}

export default PresentCardText
