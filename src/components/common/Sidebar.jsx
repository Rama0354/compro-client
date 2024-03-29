import React, { useState } from 'react'
import Search from '../search/Search'
import ListNews from '../search/ListNews'

function Sidebar({setting,news, sc, setSc}) {

    return (
        <div className="w-2/6 bg-white p-6 my-6 hidden sm:flex flex-col gap-3">
            <div>
                <Search news={news} setSc={setSc} />
            </div>
            <div>
                <div className='border-b border-slate-200 mb-3'>
                    <h2 className='text-lg text-green-600 font-poppins font-semibold' >Berita Terbaru</h2>
                </div>
                {
                <ListNews sc={sc}/>
                }
            </div>
            <div>
                <div className='border-b border-slate-200 mb-3'>
                    <h2 className='text-lg text-green-600 font-poppins font-semibold' >Kontak Kami</h2>
                </div>
                <p className='flex flex-col'>
                    <span className=' text-base text-slate-600 font-poppins'>E-Mail : <span className='whitespace-nowrap'>{setting?.email}</span></span>
                    <span className=' text-base text-slate-600 font-poppins'>Phone : {setting?.phone}</span>
                    <span className=' text-base text-slate-600 font-poppins'>Alamat : {setting?.address}</span>
                </p>
            </div>
        </div>
    )
}

export default Sidebar