import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { baseURL } from '../../api/axios'

import { menuBtn, closeBtn, settings } from '../../assets'
import useAuth from '../../hooks/useAuth'
import styles from '../../style'

function Navbar({setting,navLinks}) {
  const [toggle, setToggle] = useState(false)
  const {currentUser, logout} = useAuth()
  
  const handleClose = (e) => {
      if (e.target.classList.contains("dismiss")) {
      setToggle(false);
      }
  };
  return (
    <nav className='w-full flex py-3 justify-between items-center navbarv'>
      <div>
          {setting?.is_logo_text === 'y' ?
          <Link to={'/'}><img className='w-[120px]' src={baseURL+setting?.logo} alt="logo" /></Link>
          : <h2 className='font-poppins font-semibold text-[24px] text-white'><Link to={'/'}>{setting?.name}</Link></h2>
          }
      </div>
      <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
        {navLinks.map((nav,index)=>(
          <li key={nav.id} className={`${index === navLinks.length - 1 ? 'mr-0' : 'mr-1'}`}>
            <Link className='font-poppins font-normal cursor-poiner hover:bg-slate-300/25 text-white py-2 px-3 rounded-md' to={`${nav.path}`}>{nav.title}</Link>
          </li>
        ))}
        {!currentUser
          ? <li><Link className='font-poppins font-normal cursor-poiner hover:bg-slate-300/25 text-white py-2 px-3 rounded-md' to="/login">Login</Link></li>
          : (<div className='relative group'>
            <span className='text-white font-semibold font-poppins hover:bg-slate-300/25 py-2 px-3 rounded-lg cursor-pointer '>{currentUser?.name}</span>
            <div className='absolute z-10 invisible pointer-events-none group-hover:visible group-hover:pointer-events-auto duration-150 transition-all right-0 w-56 shadow-lg pt-4'>
              <div className='w-full flex flex-col p-3 bg-white rounded-t-lg'>
                <p className={`${styles.paragraph}`}> <span className='font-semibold'> Nama : </span> {currentUser?.name}</p>
                <p className={`${styles.paragraph}`}> <span className='font-semibold'> Status : </span> {currentUser?.role}</p>
              </div>
              <div className='flex justify-between items-center border-t bg-gradient-to-br from-green-400 to-green-600 border-slate-200 rounded-b-lg'>
                <span>
                  <Link to="/user/form" state={setting}><img className='font-poppins font-normal cursor-poiner hover:bg-slate-300/25 text-slate-600 py-2 px-3 rounded-md' src={`${settings}`} alt="logo" /> </Link>
                </span>
                <Link className='font-poppins font-normal cursor-poiner hover:bg-slate-300/25 text-white py-2 px-3 rounded-md' onClick={logout}>Logout</Link>
              </div>
            </div>
          </div>)
        }
      </ul>
      <div className='sm:hidden flex flex-1 justify-end items-center dismiss' onClick={handleClose}>
        <img src={toggle ? closeBtn : menuBtn} onClick={()=>setToggle(prev => !prev)} alt='menu' className='w-[28] h-[28] object-contain hover:bg-slate-300/25 p-3 rounded-lg duration-150 ease-out cursor-pointer'/>
          <div className={`${(toggle ? 'opacity-1 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-5')} bg-slate-200 dismiss flex w-full h-max fixed z-10 top-16 right-0 duration-150`}>
            <ul className='list-none sm:flex flex-col xs:flex-row justify-end items-center flex-1'>
              {navLinks.map((nav,index)=>(
                <li key={index} className={`bg-white`}>
                  <Link className='font-poppins font-normal cursor-poiner hover:bg-slate-300/25 text-slate-600 py-2 px-3 w-full inline-block rounded-md' to={`${nav.path}`}>{nav.title}</Link>
                </li>
              ))}
              {currentUser ? 
                <div className='relative'>
                  <div className='w-full shadow-lg pt-1'>
                    <div className='w-full flex flex-col p-3 bg-white rounded-t-lg'>
                      <p className={`${styles.paragraph}`}> <span className='font-semibold'> Nama : </span> {currentUser?.name}</p>
                      <p className={`${styles.paragraph}`}> <span className='font-semibold'> Status : </span> {currentUser?.role}</p>
                    </div>
                    <div className='flex justify-between items-center border-t bg-gradient-to-br from-green-400 to-green-600 border-slate-200 rounded-b-lg'>
                      <span>
                        <Link to="/user/form" state={setting}><img className='font-poppins font-normal cursor-poiner hover:bg-slate-300/25 text-slate-600 py-2 px-3 rounded-md' src={`${settings}`} alt="logo" /> </Link>
                      </span>
                      <Link className='font-poppins font-normal cursor-poiner hover:bg-slate-300/25 text-white py-2 px-3 rounded-md' onClick={logout}>Logout</Link>
                    </div>
                  </div>
                </div>
                : <li className={`bg-white my-1`}>
                    <Link className='font-poppins font-normal cursor-poiner hover:bg-slate-300/25 text-slate-600 py-2 px-3 w-full inline-block rounded-md' to="/login">Login</Link>
                  </li>}
            </ul>
          </div>
      </div>
    </nav>
  )
}

export default Navbar