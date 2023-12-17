import React, { FC } from 'react'
import './Input.css'
import { Link } from 'react-router-dom'

interface IInput {
    title: string,
    placeholder: string,
    type: 'text' | 'email' | 'password',
    value: string,
    handleChange: (e: any) => void,
    forgot?: boolean,
    defect?: boolean
}

const Input:FC<IInput> = ({title, placeholder, type, value, handleChange, forgot, defect}) => {
    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e.currentTarget.value)
    }

    return (
        <div className='input'>
            <p className='input__title'>{title}</p>
            <input className={`input__input ${defect ? 'defect' : ''}`} type={type} placeholder={placeholder} value={value} onChange={(e) => changeInput(e)} />
            {forgot &&
                <Link to='/reset-password' className='input__forgot'>Forgot password?</Link>
            }
        </div>
    )
}

export default Input
