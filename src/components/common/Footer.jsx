import React from 'react'
import { Link } from 'react-router-dom'

function Footer({setting, navLinks}) {
  return (
    <>
    <div className='w-full bg-white flex flex-col sm:flex-row'>
      <div className='w-full p-6'>
        <div className='w-full pb-3 border-b border-slate-200 mb-3'>
        <h2 className='w-full font-poppins font-bold text-lg text-green-600'>Kontak Kami</h2>
        </div>
        <p className='flex flex-col'>
          <span>E-Mail : {setting?.email}</span>
          <span>Phone : {setting?.phone}</span>
          <span>Alamat : {setting?.address}</span>
        </p>
      </div>
      <div className='w-full p-6'>
        <div className='w-full pb-3 border-b border-slate-200 mb-3'>
        <h2 className='w-full font-poppins font-bold text-lg text-green-600'>Navigasi</h2>
        </div>
        <ul className='flex flex-col gap-3'>
          {navLinks.map((nav,index)=>(
            <li key={index}><Link to={`${nav.path}`}>{nav.title}</Link></li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}

export default Footer