import React, { FC, ReactNode } from 'react'
import './Button.css'

interface IButton {
    children: ReactNode,
    color: 'red' | 'white' | 'grey',
    handleClick?: () => void,
    className?: string,
    isMin?: boolean,
    becomeSmall?: boolean,
    fill?: boolean
}

const Button:FC<IButton> = ({children, color, handleClick, className, isMin, becomeSmall, fill}) => {
  return (
        <button
            type="button"
            className={`
                custom-button 
                border-${color} 
                ${className}
                ${fill ? "fill" : ""}
                ${isMin ? "height-min" : ""}
                ${becomeSmall ? "become-small" : ""}
            `}
            onClick={handleClick}
        >
            {children}
        </button>
  );
}

export default Button
