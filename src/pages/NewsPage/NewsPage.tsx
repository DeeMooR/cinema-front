import React, {useEffect, useState} from 'react'
import PageTemplate from 'src/components/PageTemplate'

import './NewsPage.css'
import HorizontalNews from 'src/components/HorizontalNews'
import { INews } from 'src/interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { GET_NEWSPAGE_NEWS } from 'src/actions/actions'

const NewsPage = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const arrNewsPageNews: INews[] = useSelector(({storePages}) => storePages.newsPageNews);
    const isLoadingPage = useSelector(({store}) => store.isLoadingPage);
    const [modal, setModal] = useState(<div/>);

    useEffect(() => {
        window.scrollTo({top: 0});
        const fetchData = async () => {
            dispatch({ type: "SET_LOADING_PAGE" });
            if (!arrNewsPageNews.length) await dispatch(GET_NEWSPAGE_NEWS(setModal));
            dispatch({ type: "SET_LOADING_PAGE" });
        };
        fetchData();
    },[])

    return (
        <>
        {modal}
        {isLoadingPage ? (
            <div className="loaderPage">
                <div className="loaderPage__element"></div>
            </div>
        ) : (
            <PageTemplate>
                <div className='newsPage'>
                    <h1 className='newsPage__title'>Новости</h1>
                    {arrNewsPageNews.map((item: INews, index: number) => (
                        <div className="news__item" key={index}>
                            {index % 2 === 0
                            ? <HorizontalNews obj={item} page='main' />
                            : <HorizontalNews obj={item} page='main' reverse />
                            }
                        </div>
                    ))}
                </div>
            </PageTemplate>
        )}
        </>
    )
}

export default NewsPage
