import React, { lazy, Suspense } from 'react'
import styles from '../style'

const Hero = lazy(()=> import('../components/Hero'))
const About = lazy(()=> import('../components/About'))
const Infos = lazy(()=> import('../components/Infos'))
const Gallery = lazy(()=> import('../components/Gallery'))
const News = lazy(()=> import('../components/News'))

function HomePage({news, gallery, slider,refreshSlider, infos,refreshInfos, successNotif, failNotif, setting, loading}) {
    return (
        <>
            <div className={`${styles.flexStart} mt-16`}>
                <div className={`${styles.boxWidth}`}>
                <Suspense fallback={<span>Loading...</span>}>
                    <Hero slider={slider} refreshSlider={refreshSlider} successNotif={successNotif} failNotif={failNotif}/>
                </Suspense>
                </div>
            </div>
            <div className={`${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                <Suspense fallback={<span>Loading...</span>}>
                    <About setting={setting} loading={loading}/>
                    <Infos infos={infos} refreshInfos={refreshInfos} loading={loading} />
                    <Gallery gallery={gallery} loading={loading}/>
                    <News news={news}/>
                </Suspense>
                </div>
            </div>
        </>
    )
}

export default HomePage