import {getNews} from '../../api/axios'
import React, { useEffect, useRef, useState } from 'react'
import Search from '../Search'
import ListNews from '../ListNews'
import {SkeletonNewsSmallList} from '../Skeletone'

function Sidebar({setting,loading,newsSearch,searchResult,setSearchResult}) {
    return (
        <div className="w-2/6 bg-white p-6 my-6 hidden sm:flex flex-col gap-3">
            <div>
                <Search news={newsSearch} setSearchResult={setSearchResult} />
            </div>
            <div>
                <div className='border-b border-slate-200 mb-3'>
                    <h2 className='text-lg text-green-600 font-poppins font-semibold' >Berita Terbaru</h2>
                </div>
                {loading ? 
                    <SkeletonNewsSmallList/>
                :
                <ListNews searchResult={searchResult}/>
                }
            </div>
            <div>
                <div className='border-b border-slate-200 mb-3'>
                    <h2 className='text-lg text-green-600 font-poppins font-semibold' >Kontak Kami</h2>
                </div>
                <p className='flex flex-col'>
                    <span className=' text-base text-slate-600 font-poppins'>E-Mail : <span className='whitespace-nowrap'>{setting.email}</span></span>
                    <span className=' text-base text-slate-600 font-poppins'>Phone : {setting.phone}</span>
                    <span className=' text-base text-slate-600 font-poppins'>Alamat : {setting.address}</span>
                </p>
            </div>
        </div>
    )
}

export default Sidebar