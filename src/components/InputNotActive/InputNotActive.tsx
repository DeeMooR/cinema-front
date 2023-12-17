import React, { FC } from 'react'
import './InputNotActive.css'
import { Link } from 'react-router-dom'

interface IInputNotActive {
    title: string,
    value: string
}

const InputNotActive:FC<IInputNotActive> = ({title, value}) => {
    return (
        <div className='inputNotActive'>
            <p className='inputNotActive__title'>{title}</p>
            <div className='inputNotActive__value'>{value}</div>
        </div>
    )
}

export default InputNotActive
