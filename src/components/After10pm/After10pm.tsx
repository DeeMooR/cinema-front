import React, { FC } from 'react'
import './After10pm.css'

interface IAfter10pm {
    timeEnd: string
}

const After10pm:FC<IAfter10pm> = ({timeEnd}) => {
  
    const [hours, minutes] = timeEnd.split(':').map(Number);
    const show = (hours === 22 || hours === 23 || (hours >= 0 && hours < 3)) ? true : false;

    return (
        <>
        {show &&
            <div className='after10pm'>
                <p className="after10pm__title">Этот сеанс закончится после 22:00.</p>
                <p className="after10pm__text">Обратите внимание! После 22:00 выход из кинотеатра, в том числе к паркингу, осуществляется через улицу. В случае возникновения вопросов, обращайтесь к нашим сотрудникам, они будут рады Вам помочь.</p>
            </div>
        }
        </>
    )
}

export default After10pm
