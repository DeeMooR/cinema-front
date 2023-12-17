import React, { FC, ReactNode } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './PageTemplate.css'

interface IPageTemplate {
    children: ReactNode,
    wrapper?: boolean,
}

const PageTemplate:FC<IPageTemplate> = ({children, wrapper}) => {
    return (
        <div className='pageTemplate'>
            <Header />
            {wrapper ? 
                <div className='pageTemplate__wrapper'>
                    <main>{children}</main>
                </div>
            :
                <main>{children}</main>
            }
            <Footer />
        </div>
    )
}

export default PageTemplate
