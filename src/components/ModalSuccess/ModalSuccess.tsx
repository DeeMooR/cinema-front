import React, { FC, useEffect, useState } from 'react'
import './ModalSuccess.css'

import success from "src/icons/check.svg"
import error from "src/icons/cross.svg"

interface IModalSuccess {
    isSuccess: boolean
}

const ModalSuccess:FC<IModalSuccess> = ({isSuccess}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsModalVisible(true);
        }, 10);
        setTimeout(() => {
          setIsModalVisible(false);
        }, 3000);
    }, []);

    return (
        <div className={`modalSuccess ${isSuccess ? 'success' : 'error'} ${isModalVisible ? 'show' : ''}`}>
            <img src={isSuccess ? success : error} className='modalSuccess__image' alt="icon" />
            <p className='modalSuccess__text'>{isSuccess ? 'Success' : 'Error'}</p>
        </div>
    )
}

export default ModalSuccess
