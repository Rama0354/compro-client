import React, { useState } from 'react'
import styles from '../../style'
import { baseURL } from '../../api/axios'
import { editBtn } from '../../assets'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import useAuth from '../../hooks/useAuth'
import Notif from '../../components/notif'


function AboutPage({setting}) {
    const {currentUser} = useAuth()
    return (
        <div className="w-full min-h-[608px] bg-white p-6 my-6">
            <div className='p-3 border-b border-slate-200 relative'>
                <h2 className={`${styles.title}`}>Tentang Kami</h2>
                {currentUser?.role === 'superadmin' && <Link to={'/settings'} state={setting} className={`${styles.buttonImg} text-white bg-sky-500 hover:bg-sky-600 absolute right-0 top-0`} ><img className='w-8 h-8' src={`${editBtn}`} alt='button' /> <span className='mr-1 hidden sm:block'>Edit</span></Link>}
            </div>
            <div className='w-full my-3 flex flex-col gap-6'>
                <div className='w-full h-38 sm:h-96 overflow-hidden flex items-center'>
                    <LazyLoadImage placeholderSrc={setting.thumb_url} src={setting.image_url} className='w-screen h-screen object-cover' alt="ptbimage" />
                </div>
                <div className={`${styles.paragraph}`} dangerouslySetInnerHTML={{__html: setting.description}}></div>
            </div>
            <Notif/>
        </div>
    )
}

export default AboutPage