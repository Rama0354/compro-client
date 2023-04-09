import React, { useEffect, useRef, useState } from 'react'
import TextEditor from '../../components/TextEditor'
import styles from '../../style'
import {baseURL, createNews, updateNews} from '../../api/axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

function FormNews({refreshNews,successNotif}) {
    const state = useLocation().state
    const [title,setTitle] = useState(state?.title || '')
    const [subtitle,setSubtitle] = useState(state?.subtitle || '')
    const [image,setImage] = useState(null)
    const [body,setBody] = useState(state?.body || '')
    const [isPublish,setIsPublish] = useState(state?.is_publish || 'n')
    const [preview,setPreview] = useState()

    const [errMsg,setErrMsg] = useState('')
    const [errTitleMsg,setErrTitleMsg] = useState('')
    const [errSubtitleMsg,setErrSubtitleMsg] = useState('')
    const [errImageMsg,setErrImageMsg] = useState('')

    const navigate = useNavigate()
    const {currentUser} = useAuth()

    const errRef = useRef()
    const titleRef = useRef()
    const subtitleRef = useRef()
    const imageRef = useRef()
    useEffect(()=>{
        titleRef.current.focus()
        subtitleRef.current.focus()
        imageRef.current.focus()
    },[])
    useEffect(()=>{
        setErrMsg('')
        setErrTitleMsg('')
        setErrSubtitleMsg('')
        setErrImageMsg('')
    },[title,subtitle,image])

    const onImageUpload = (e)=>{
        const file = e.target.files[0]
        setImage(file)
        setPreview(URL.createObjectURL(file))
    }

    const handleCheck = (e)=>{
        e.target.checked ? setIsPublish('y') : setIsPublish('n')
    }

    const handleSubmit = async (e)=>{
        const data = new FormData()
        data.set('title',title)
        data.set('subtitle',subtitle)
        data.set('body',body)
        data.set('is_publish',isPublish)
        if(state){
            image === null ? '' : data.set('image',image)
        }else{
            data.set('image',image)
        }

        e.preventDefault()
        try {
            const res =
            state ? updateNews(state.id,data)
            : createNews(data)
            res.then(()=>{
                refreshNews()
                successNotif()
                navigate('/berita')
            }).catch(error=>{
                if(!error?.response){
                    setErrMsg('Server no response')
                }else if(error?.response?.status === 422){
                    setErrTitleMsg(error?.response?.data?.title)
                    setErrSubtitleMsg(error?.response?.data?.subtitle)
                    setErrImageMsg(error?.response?.data?.image)
                }else if(error?.response){
                    setErrMsg(error?.response?.message)
                }else{
                    setErrMsg('Gagal Disimpan')
                }
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className={`  ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <div className="w-full bg-white my-6">
                    <div className='p-6 border-b border-slate-200'>
                        <h2 className={`${styles.title}`}>{state ? 'Ubah' : 'Buat'} Berita</h2>
                    </div>
                    <div className="relative">
                        <form className='w-full flex flex-col sm:flex-row' onSubmit={handleSubmit}>
                        <p ref={errRef} className={errMsg ? "font-poppins text-rose-600 text-sm" : "hidden"} aria-live='assertive'>{errMsg}</p>
                            <div className='my-3 flex flex-col gap-3 w-full py-3 order-1 sm:order-none'>
                                <div className='px-6 flex flex-col sm:flex-row items-center'>
                                    <label className='sm:w-40 p-3 inline-block font-poppins font-semibold text-sm sm:text-base text-slate-500' htmlFor="title">Title</label>
                                    <div className="w-full">
                                        <input ref={titleRef} className='w-full p-3 border rounded-md focus:outline-1 font-poppins text-base outline-green-300 border-slate-300 bg-white text-slate-600' type="text" name='title' placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)} required={true} />
                                        <p ref={errRef} className={errTitleMsg ? "font-poppins text-rose-600 text-sm" : "hidden"} aria-live='assertive'>{errTitleMsg}</p>
                                    </div>
                                </div>
                                <div className='px-6 flex flex-col sm:flex-row items-center'>
                                    <label className='sm:w-40 p-3 inline-block font-poppins font-semibold text-sm sm:text-base text-slate-500' htmlFor="subtitle">Summary</label>
                                    <div className="w-full">
                                        <input ref={subtitleRef} className='w-full p-3 border rounded-md focus:outline-1 font-poppins text-base outline-green-300 border-slate-300 bg-white text-slate-600' type="text" name='subtitle' placeholder='subtitle' value={subtitle} onChange={e=>setSubtitle(e.target.value)} required={true} />
                                        <p ref={errRef} className={errSubtitleMsg ? "font-poppins text-rose-600 text-sm" : "hidden"} aria-live='assertive'>{errSubtitleMsg}</p>
                                    </div>
                                </div>
                                <div className='px-6 flex flex-col sm:flex-row items-center'>
                                    <label className='sm:w-40 p-3 inline-block font-poppins font-semibold text-sm sm:text-base text-slate-500' htmlFor="cover">Gambar</label>
                                    <div className="w-full">
                                        <input ref={imageRef} className='w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-600 hover:file:bg-green-200' type="file" name="cover" id="cover" onChange={onImageUpload}/>
                                        <p ref={errRef} className={errImageMsg ? "font-poppins text-rose-600 text-sm" : "hidden"} aria-live='assertive'>{errImageMsg}</p>
                                    </div>
                                </div>
                                <div className='px-6 pb-12 sm:p-0'>
                                    <TextEditor value={body} onChange={setBody}/>
                                </div>
                            </div>
                            <div className='w-full sm:w-[300px] bg-slate-50 flex-shrink-0'>
                                <div className='w-full p-3 border-b border-slate-300 flex flex-col gap-3'>
                                    <p className={`${styles.paragraph}`}>Status</p>
                                    <span>
                                        <p>Author : {state ? state.author.name : currentUser?.name }</p>
                                        {state && <p>Created : {state.created_at}</p>}
                                    </span>
                                    <label className="relative inline-flex items-center mb-4 cursor-pointer">
                                        <input type="checkbox" name='is_publish' value={isPublish ==='y' ? 'y' : 'n'} checked={isPublish === 'y'} onChange={handleCheck} className="sr-only peer"/>
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-900">Publish</span>
                                    </label>
                                    <div className='flex gap-6 justify-between'>
                                        <button className={`${styles.button} rounded-lg text-white bg-green-400 hover:bg-green-600`}>Simpan</button>
                                        <Link to={'/berita'} className={`${styles.button} rounded-lg text-white bg-rose-400 hover:bg-rose-600`} >Batal</Link>
                                    </div>
                                </div>
                                <div className='w-full p-3'>
                                    <p className={`${styles.paragraph}`}>Picture</p>
                                    {state ?
                                        image == null ? <img src={baseURL+state.image} className='w-full' alt="gallery"/> : <img src={preview} className='w-full' alt="gallery"/> 
                                    :
                                        image == null ? "" : <img src={preview} className='w-full' alt="gallery"/>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormNews