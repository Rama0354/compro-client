import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { api, baseURL, updateSettings } from '../../api/axios'
import TextEditor from '../../components/TextEditor'
import styles from '../../style'
import { useDispatch } from 'react-redux'
import { editSetting } from '../../redux/feature/setting'
import {toast} from 'react-toastify'

const WebSettings = ({init}) => {
    const state = useLocation().state
    const [name,setName] = useState(state?.name || '')
    const [email,setEmail] = useState(state?.email || '')
    const [phone,setPhone] = useState(state?.phone || '')
    const [address,setAddress] = useState(state?.address || '')
    const [description,setDescription] = useState(state?.description || '')
    const [image,setImage] = useState(null)
    const [logo,setLogo] = useState(null)
    const [prevLogo,setPrevLogo] = useState()
    const [prevImage,setPrevImage] = useState()
    const [isLogoText,setIsLogoText] = useState(state?.is_logo_text || 'n')

    const [errMsg,setErrMsg] = useState('')
    const [errNameMsg,setErrNameMsg] = useState('')
    const [errEmailMsg,setErrEmailMsg] = useState('')
    const [errPhoneMsg,setErrPhoneMsg] = useState('')
    const [errAddressMsg,setErrAddressMsg] = useState('')
    const [errImageMsg,setErrImageMsg] = useState('')
    const [errLogoMsg,setErrLogoMsg] = useState('')

    const errRef = useRef()
    const nameRef = useRef()
    const emailRef = useRef()
    const phoneRef = useRef()
    const addressRef = useRef()
    const imageRef = useRef()
    const logoRef = useRef()

    useEffect(()=>{
        setErrMsg('')
        setErrNameMsg('')
        setErrEmailMsg('')
        setErrPhoneMsg('')
        setErrAddressMsg('')
        setErrImageMsg('')
        setErrLogoMsg('')
    },[name,email,phone,address,image,logo])
    useEffect(()=>{
        nameRef.current.focus()
        emailRef.current.focus()
        phoneRef.current.focus()
        addressRef.current.focus()
        imageRef.current.focus()
        logoRef.current.focus()
    },[])
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const onImageUpload = (e)=>{
        const file = e.target.files[0]
        setImage(file)
        setPrevImage(URL.createObjectURL(file))
    }
    const onLogoUpload = (e)=>{
        const file = e.target.files[0]
        setLogo(file)
        setPrevLogo(URL.createObjectURL(file))
    }
    const handleCheck = (e)=>{
        e.target.checked ? setIsLogoText('y') : setIsLogoText('n')
    }

    const handleSubmit = async (e)=>{
        const data = new FormData()
        data.set('name',name)
        data.set('email',email)
        data.set('phone',phone)
        data.set('address',address)
        data.set('description',description)
        image === null ? '' : data.set('image',image)
        logo === null ? '' : data.set('logo',logo)
        data.set('is_logo_text',isLogoText)
        e.preventDefault()

        try {
            dispatch(editSetting({data,toast,init,navigate}))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={`  ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <div className="w-full bg-white my-6">
                    <div className='p-6 border-b border-slate-200'>
                        <h2 className={`${styles.title}`}>Pengaturan Website</h2>
                    </div>
                        <form className='w-full flex flex-col sm:flex-row' onSubmit={handleSubmit}>
                            <div className="my-3 w-full flex-col order-1 sm:order-none">
                            <p ref={errRef} className={errMsg ? "font-poppins text-rose-600 text-sm" : "hidden"} aria-live='assertive'>{errMsg}</p>
                                <div className='p-3 flex flex-col sm:flex-row items-center'>
                                    <label className={`${styles.formLabel}`} htmlFor="name">Nama Website</label>
                                    <div className="w-full">
                                        <input ref={nameRef} value={name} onChange={e=>setName(e.target.value)} className='w-full p-3 border rounded-md focus:outline-1 font-poppins text-base outline-green-300 border-slate-300 text-slate-600' type="text" name='name' placeholder='Web Nmae' />
                                        <p ref={errRef} className={errNameMsg ? "font-poppins text-rose-600 text-sm" : "hidden"} aria-live='assertive'>{errNameMsg}</p>
                                    </div>
                                </div>
                                <div className='p-3 flex flex-col sm:flex-row items-center'>
                                    <label className={`${styles.formLabel}`} htmlFor="email">E-Mail</label>
                                    <div className="w-full">
                                        <input ref={emailRef} value={email} onChange={e=>setEmail(e.target.value)} className='w-full p-3 border rounded-md focus:outline-1 font-poppins text-base outline-green-300 border-slate-300 text-slate-600' type="text" name='email' placeholder='web@mail.com' />
                                        <p ref={errRef} className={errEmailMsg ? "font-poppins text-rose-600 text-sm" : "hidden"} aria-live='assertive'>{errEmailMsg}</p>
                                    </div>
                                </div>
                                <div className='p-3 flex flex-col sm:flex-row items-center'>
                                    <label className={`${styles.formLabel}`} htmlFor="phone">Nomor Telepon</label>
                                    <div className="w-full">
                                        <input ref={phoneRef} value={phone} onChange={e=>setPhone(e.target.value)} className='w-full p-3 border rounded-md focus:outline-1 font-poppins text-base outline-green-300 border-slate-300 text-slate-600' type="text" name='phone' placeholder='08XXXXXXX' />
                                        <p ref={errRef} className={errPhoneMsg ? "font-poppins text-rose-600 text-sm" : "hidden"} aria-live='assertive'>{errPhoneMsg}</p>
                                    </div>
                                </div>
                                <div className='p-3 flex flex-col sm:flex-row items-center'>
                                    <label className={`${styles.formLabel}`} htmlFor="address">Alamat</label>
                                    <div className="w-full">
                                        <input ref={addressRef} value={address} onChange={e=>setAddress(e.target.value)} className='w-full p-3 border rounded-md focus:outline-1 font-poppins text-base outline-green-300 border-slate-300 text-slate-600' type="text" name='address' placeholder='Jl. Raya...' />
                                        <p ref={errRef} className={errAddressMsg ? "font-poppins text-rose-600 text-sm" : "hidden"} aria-live='assertive'>{errAddressMsg}</p>
                                    </div>
                                </div>
                                <div className='p-3 pb-12 sm:p-3 flex flex-col sm:flex-row items-center'>
                                    <TextEditor value={description} onChange={setDescription} name="description" />
                                </div>
                            </div>
                            <div className="w-full sm:w-[300px] flex-shrink-0 bg-slate-100">
                                <div className='p-3 flex justify-between border-b border-slate-300'>
                                    <button className={`${styles.button} rounded-lg text-white bg-green-400 hover:bg-green-600`}>Simpan</button>
                                    <Link to={'/tentang'} className={`${styles.button} rounded-lg text-white bg-rose-400 hover:bg-rose-600`}>Batal</Link>
                                </div>
                                <div className="w-full p-3 flex flex-col gap-3">
                                    <label className="relative inline-flex items-center mb-4 cursor-pointer">
                                        <input type="checkbox" name='is_logo_text' value={isLogoText ==='y' ? 'y' : 'n'} checked={isLogoText === 'y'} onChange={handleCheck} className="sr-only peer"/>
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-900">Logo Image</span>
                                    </label>
                                    <div>
                                        <p className={`${styles.paragraph}`}>Logo</p>
                                        <input ref={logoRef} onChange={onLogoUpload} className={`${styles.formFile} w-full`} type="file" name="logo" id="logo" />
                                        <p ref={errRef} className={errLogoMsg ? "font-poppins text-rose-600 text-sm" : "hidden"} aria-live='assertive'>{errLogoMsg}</p>
                                        {state ?
                                            logo == null ? <img src={baseURL+state.logo} className='w-full' alt="gallery"/> : <img src={prevLogo} className='w-full' alt="gallery"/> 
                                        :
                                            logo == null ? "" : <img src={prevLogo} className='w-full' alt="gallery"/>
                                        }
                                    </div>
                                    <div>
                                        <p className={`${styles.paragraph}`}>Sampul</p>
                                        <input ref={imageRef} onChange={onImageUpload} className={`${styles.formFile} w-full`} type="file" name="image" id="image" />
                                        <p ref={errRef} className={errImageMsg ? "font-poppins text-rose-600 text-sm" : "hidden"} aria-live='assertive'>{errImageMsg}</p>
                                        {state ?
                                            image == null ? <img src={baseURL+state.image} className='w-full' alt="gallery"/> : <img src={prevImage} className='w-full' alt="gallery"/> 
                                        :
                                            image == null ? "" : <img src={prevImage} className='w-full' alt="gallery"/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    )
}

export default WebSettings