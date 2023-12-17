import React from 'react'
import { StyledIcon } from './styled'
import './Footer.css'

import vk from "../../icons/vk.svg"
import vkDark from "../../icons/vk-dark.svg"
import facebook from "../../icons/facebook.svg"
import facebookDark from "../../icons/facebook-dark.svg"
import instagram from "../../icons/instagram.svg"
import instagramDark from "../../icons/instagram-dark.svg"

import visa from "../../icons/visa.svg"
import mastercard from "../../icons/mastercard.svg"
import unionpay from "../../icons/unionpay.svg"
import belcard from "../../icons/belcard.svg"
import assist from "../../icons/assist.svg"
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__icons">
                <div className="footer__social-networks">
                    <a href="https://vk.com/moooncinemas" target='blank'><StyledIcon image={{light: vk, dark: vkDark}} /></a>
                    <a href="https://www.facebook.com/mooonminsk" target='blank'><StyledIcon image={{light: facebook, dark: facebookDark}} /></a>
                    <a href="https://www.instagram.com/moooncinema" target='blank'><StyledIcon image={{light: instagram, dark: instagramDark}} /></a>
                </div>
                <div className="footer__payments">
                    <img src={visa} className='visa' alt="visa" />
                    <img src={mastercard} alt="mastercard" />
                    <img src={unionpay} alt="unionpay" />
                    <img src={belcard} alt="belcard" />
                    <img src={assist} alt="assist" />
                </div>
            </div>
            <hr className='footer__line' />
            <div className="footer__legal">
                <p className='copyright'>© 2018–2023 ООО «Кино маяк»</p>
                <div className='links'>
                    <Link to='/page404'>Публичная оферта</Link>
                    <Link to='/page404'>Соглашение с пользователем</Link>
                </div>
            </div>
            <p className='footer__registry'>Зарегистрировано решением Минского районного исполнительного комитета от 13.11.2014 г. в Едином государственном регистре юридических лиц и индивидуальных предпринимателей за №192376313. УНП 192376313, юридический адрес: 220114, г. Минск, ул. П. Мстиславца, д.11, пом. 5, часть пом. 5-11 Интернет-магазин silverscreen.by. Режим работы: круглосуточно. Дата регистрации в Торговом реестре: 01.12.2020 г.</p>
            <p className='footer__email'>e-mail: info@mooon.by.</p>
        </footer>
    );
}

export default Footer
