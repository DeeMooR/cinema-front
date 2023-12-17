import React, { FC, ReactNode } from 'react'
import './ButtonForm.css'

interface IButtonForm {
    children: ReactNode,
    handleClick?: () => void
}

const ButtonForm:FC<IButtonForm> = ({children, handleClick}) => {
    return (
        <button
            type="button"
            className='buttonForm'
            onClick={handleClick}
        >
            {children}
        </button>
    );
}

export default ButtonForm
