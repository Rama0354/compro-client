import React, { lazy, Suspense } from 'react'
import styles from '../style'

const Hero = lazy(()=> import('../components/hero/Hero'))
const About = lazy(()=> import('../components/home/About'))
const Infos = lazy(()=> import('../components/home/Infos'))
const Gallery = lazy(()=> import('../components/home/Gallery'))
const News = lazy(()=> import('../components/home/News'))

function HomePage({news, setting, loading}) {
    return (
        <>
            <div className={`${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                <Suspense fallback={<span>Loading...</span>}>
                    <Hero/>
                </Suspense>
                </div>
            </div>
            <div className={`${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                <Suspense fallback={<span>Loading...</span>}>
                    <About setting={setting} loading={loading}/>
                    <Infos/>
                    <Gallery/>
                    <News news={news}/>
                </Suspense>
                </div>
            </div>
        </>
    )
}

export default HomePage