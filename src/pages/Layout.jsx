import React, { lazy, Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styles from '../style'
import { Footer, Navbar } from '../components'
import { navLinks } from '../content'
import Notif from '../components/notif'

const Sidebar = lazy(()=>import('../components/common/Sidebar'))

function Layout({setting,loading,newsSearch,searchResult,setSearchResult}) {
    const location = useLocation()
    return (
        <div className="w-full bg-slate-200 overflow-hidden">
            <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter} fixed top-0 right-0 left-0 z-50`}>
                <div className={`${styles.boxWidth}`}>
                <Navbar setting={setting} navLinks={navLinks}/>
                </div>
            </div>
            {location.pathname == '/' || 
            location.pathname == '/settings' ||
            location.pathname == '/berita/form' ||
            location.pathname == '/user/form' ||
            location.pathname == '/info/form' ?
            <Suspense fallback={<span>Loading...</span>}>
                <div className="mt-16">
                    <Outlet/>
                </div>
            </Suspense>
            : 
            <div className={`${styles.flexStart} mt-16`}>
                <div className={`${styles.boxWidth} flex gap-3`}>
                <Suspense fallback={<span>Loading...</span>}>
                    <Sidebar setting={setting} loading={loading} newsSearch={newsSearch} searchResult={searchResult} setSearchResult={setSearchResult} />
                    <Outlet/>
                </Suspense>
                </div>
            </div>
            }
            <div className={`bg-white ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                <Footer setting={setting} navLinks={navLinks}/>
                </div>
            </div>
            <div className={`bg-slate-800 ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <div className=' w-full p-3 font-poppins font-semibold text-sm text-center text-white'>&copy; Copyright {setting.name} 2023 | Designed by BaktiWeb</div>
                </div>
            </div>
            <Notif/>
        </div>
    )
}

export default Layout