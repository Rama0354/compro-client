import React, { useState } from 'react'
import styles from '../../style'
import {api} from '../../api/axios'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

function UserForm() {
    const {currentUser} = useAuth()
    const [name,setName] = useState(currentUser?.name || '')
    const [email,setEmail] = useState(currentUser?.email || '')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState()

    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        const data = new FormData()
            data.set('name',name)
            data.set('email',email)
            data.set('password',password)
            data.set('password_confirmation',confirmPassword)
        e.preventDefault()
        try {
            await api.post(`/v1/user`,data,{
                headers:{
                    "Content-Type":"application/json",
                    Authorization : `Bearer ${JSON.parse(localStorage.getItem("user")).token.access_token}`
                }
            })
            console.log('berhasil tersimpan')
            navigate('/')
        } catch (error) {
            if(!error?.response){
                setMessage('Server no response')
            }else if(error?.response.status === 422){
                setMessage('Username dan Password harus di isi')
            }else if(error?.response.status === 401){
                setMessage('Unauthorized')
            }else{
                setMessage('login gagal')
            }
        }
    }


    return (
        <div className={`  ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <div className="w-full bg-white my-6">
                    <div className='p-6 border-b border-slate-200'>
                        <h2 className={`${styles.title}`}>Edit User</h2>
                    </div>
                    <div className="relative min-h-[600px]">
                            {message && <span className={`text-rose-600 absolute top-0 px-3`}>{message}</span>}
                        <form className='w-full flex flex-col sm:flex-row' onSubmit={handleSubmit}>
                            <div className='my-3 flex flex-col gap-3 w-full py-3 order-1 sm:order-none'>
                                <div className='px-6 flex flex-col sm:flex-row items-center'>
                                    <label className='sm:w-40 p-3 inline-block font-poppins font-semibold text-sm sm:text-base text-slate-500' htmlFor="name">Name</label>
                                    <input className='w-full p-3 border rounded-md focus:outline-1 font-poppins text-base outline-green-300 border-slate-300 bg-white text-slate-600' type="text" name='name' placeholder='admin' value={name} onChange={e=>setName(e.target.value)} required={true} />
                                </div>
                                <div className='px-6 flex flex-col sm:flex-row items-center'>
                                    <label className='sm:w-40 p-3 inline-block font-poppins font-semibold text-sm sm:text-base text-slate-500' htmlFor="email">E-mail</label>
                                    <input className=' disabled:bg-slate-100 disabled:cursor-not-allowed w-full p-3 border rounded-md focus:outline-1 font-poppins text-base outline-green-300 border-slate-300 bg-white text-slate-600' type="email" name='email' placeholder='admin@mail.com' value={email} onChange={e=>setEmail(e.target.value)} required={true} disabled={true} />
                                </div>
                                <div className='px-6 flex flex-col sm:flex-row items-center'>
                                    <label className='sm:w-40 p-3 inline-block font-poppins font-semibold text-sm sm:text-base text-slate-500' htmlFor="password">Password</label>
                                    <input className='w-full p-3 border rounded-md focus:outline-1 font-poppins text-base outline-green-300 border-slate-300 bg-white text-slate-600' type="password" name='password' value={password} onChange={e=>setPassword(e.target.value)} required={true} />
                                </div>
                                <div className='px-6 flex flex-col sm:flex-row items-center'>
                                    <label className='sm:w-40 p-3 inline-block font-poppins font-semibold text-sm sm:text-base text-slate-500' htmlFor="password_confirmation">Confirm Password</label>
                                    <input className='w-full p-3 border rounded-md focus:outline-1 font-poppins text-base outline-green-300 border-slate-300 bg-white text-slate-600' type="password" name='password_confirmation' value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} required={true} />
                                </div>
                            </div>
                            <div className='w-full sm:w-[300px] bg-slate-50 flex-shrink-0'>
                                <div className='w-full p-3 border-b border-slate-300 flex flex-col gap-3'>
                                    <div className='flex gap-6 justify-between'>
                                        <button className={`${styles.button} rounded-lg text-white bg-green-400 hover:bg-green-600`}>Simpan</button>
                                        <Link to={'/'} className={`${styles.button} rounded-lg text-white bg-rose-400 hover:bg-rose-600`} >Batal</Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserForm