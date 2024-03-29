import React, { useCallback, useEffect, useRef } from 'react'
import styles from '../../style'
import {Link} from 'react-router-dom'
import { SkeletonNewsCard, SkeletonNewsSmallList } from '../Skeletone'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { arRight } from '../../assets'
import { useDispatch, useSelector } from 'react-redux'
import {getAllNews} from '../../redux/feature/news'

function News() {
    const {news,loading} = useSelector((state)=>({...state.news}))
    const dispatch = useDispatch()
    const eff = useRef(false)
    
    const init = useCallback(()=>{
        dispatch(getAllNews())
    },[dispatch])
    useEffect(()=>{
        if(eff.current == true){
            init()
        } return ()=> eff.current = true
    },[init])

    return (
        <div className='w-full bg-white p p-6 mb-6'>
            <div className='w-full pb-3 mb-3 border-b border-slate-200'>
                <h2 className={`${styles.heading2} text-center`}>Berita Terbaru</h2>
            </div>
            <div className='w-full grid grid-cols-1 sm:grid-cols-[40%_1fr] gap-6'>
            {loading ? 
                <>
                    <SkeletonNewsCard/>
                    <SkeletonNewsSmallList/>
                </>
            : news && news.filter(news => news.is_publish === 'y').reverse().map((content,index)=>(
                    <div key={index} className='flex flex-col sm:flex-row gap-6 xs:first:row-span-4 group xs:first:flex-col'>
                        <div className='flex justify-center items-center overflow-hidden h-auto w-full sm:w-[200px] flex-shrink-0 group-first:w-full sm:group-first:w-full'>
                            <Link to={`/berita/${content.id}`}>
                                <LazyLoadImage className='w-full h-max' placeholderSrc={content.thumb_url} src={content.image_url} alt="news"/>
                            </Link>
                        </div>
                        <div>
                            <Link to={`/berita/${content.id}`}>
                                <h2 className='font-poppins font-bold text-xl text-slate-600 hover:text-green-600 cursor-pointer'>{content.title}</h2>
                            </Link>
                            <span className='font-poppins font-thin text-xs text-slate-600'>{content.author.name}, {content.fcreated_at}</span>
                            <p className='font-poppins text-base text-slate-600 leading-4'>{content.subtitle}</p>
                            <Link to={`/berita/${content.id}`} className={`${styles.button} mt-1 text-white bg-green-600 w-max flex items-center rounded-lg`}>Baca Lebih <img className='w-4 h-4' src={arRight} alt="btn" /></Link>
                        </div>
                    </div>
                )).slice(0,4)}
            </div>
        </div>
    )
}

export default News