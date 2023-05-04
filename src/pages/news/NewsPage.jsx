import React, { useCallback, useEffect, useRef } from 'react'
import styles from '../../style'
import { Link } from 'react-router-dom'
import { SkeletonNews } from '../../components/Skeletone'
import { addBtn, arRight } from '../../assets'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import useAuth from '../../hooks/useAuth'
import Notif from '../../components/notif'

function NewsPage({news,loading}) {

    const {currentUser} = useAuth()
    
    return (
        <div className="w-full bg-white p-6 my-6">
            <div className='relative p-3 border-b border-slate-200 flex justify-between items-center'>
                <h2 className={`${styles.title}`}>Semua Berita</h2>
                {currentUser && 
                    <Link className={`${styles.buttonImg} bg-purple-500 hover:bg-purple-600 text-white rounded-full absolute right-0`} to={'/berita/form'}>
                        <img className='w-8 h-8' src={`${addBtn}`} alt='btn' />
                        <span className='pr-1 text-sm font-poppins hidden sm:block'>Tambah</span>
                    </Link>
                }
            </div>
            <ul className='min-h-[608px]'>
                { loading ? 
                    <div className='flex flex-col gap-6'>
                        <SkeletonNews/>
                        <SkeletonNews/>
                        <SkeletonNews/>
                    </div>
                : news && news.map((news,index)=>(
                    <li key={index} className={currentUser || news.is_publish === 'y' ? 'block' : 'hidden'}>
                        <div className='flex flex-col sm:flex-row gap-6 p-3 sm:p-6'>
                            <div className='w-full sm:max-w-[280px] flex flex-shrink-0 overflow-hidden bg-slate-100'>
                                <LazyLoadImage className='w-full h-full object-cover' effect='blur' src={`http://localhost:8000/${news.image}`} alt="ptbimage" />
                            </div>
                            <div className='flex flex-col gap-1 sm:gap-3'>
                                <h3 className='font-poppins font-semibold text-lg text-green-600'>{news.title}</h3>
                                <span className='font-poppins font-thin text-sm text-slate-400'>{`${news.author.name}, ${news.fcreated_at} ${ currentUser ? news.is_publish === 'y' ? 'Published' : 'unpublish' : '' }`}</span>
                                <p className='font-poppins text-base text-slate-600'>{ screen.width > 768 ? news.subtitle : news.subtitle.slice(0,100)+'...'}</p>
                                <Link to={`/berita/${news.id}`} state={news} className={`${styles.button} text-white bg-green-600 w-max flex items-center`}>Baca Lebih <img className='w-6 h-6' src={arRight} alt="btn" /></Link>
                            </div>
                        </div>
                    </li>
                )).reverse()}
            </ul>
            <Notif/>
        </div>
    )
}

export default NewsPage