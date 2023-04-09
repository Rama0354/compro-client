import React, { useEffect, useRef, useState } from 'react'
import TextEditor from '../../components/TextEditor'
import styles from '../../style'
import { baseURL, createInfo, updateInfo } from '../../api/axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function FormArticle({successNotif,failNotif,refreshInfos}) {
    const state = useLocation().state
    const [title,setTitle] = useState(state?.title || '')
    const [image,setImage] = useState(null)
    const [body,setBody] = useState(state?.body || '')
    const [preview,setPreview] = useState()

    const [errMsg,setErrMsg] = useState('')
    const [errTitleMsg,setErrTitleMsg] = useState('')
    const [errImageMsg,setErrImageMsg] = useState('')

    const errRef = useRef()
    const titleRef = useRef()
    const imageRef = useRef()
    
    useEffect(()=>{
        titleRef.current.focus()
        imageRef.current.focus()
    },[])

    useEffect(()=>{
        setErrMsg('')
        setErrTitleMsg('')
        setErrImageMsg('')
    },[title,image])

    const navigate = useNavigate()
    const onImageUpload = (e)=>{
        const file = e.target.files[0]
        setImage(file)
        setPreview(URL.createObjectURL(file))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const data = new FormData();
        data.set('title',title)
        if(state){
            image === null ? '' : data.set('image',image)
        }else{
            data.set('image',image)
        }
        data.set('body',body)
        try {
            const res = 
            state ? updateInfo(state.id,data)
            : createInfo(data)
            res.then(()=>{
                refreshInfos()
                navigate('/')
                successNotif()
            }).catch(error=>{
                failNotif()
                if(!error?.response){
                    setErrMsg('Server no response')
                }else if(error?.response.status === 422){
                    setErrTitleMsg(error?.response?.data?.title)
                    setErrImageMsg(error?.response?.data?.image)
                }else if(error?.response){
                    setErrMsg(error?.response?.data?.message)
                }else{
                    setErrMsg('login gagal')
                }
            })
        }catch(error) {
            if(!error?.response){
                setErrMsg('Server no response')
            }else if(error?.response.status === 422){
                setErrTitleMsg(error?.response?.data?.title)
                setErrImageMsg(error?.response?.data?.image)
            }else if(error?.response){
                setErrMsg(error?.response?.data?.message)
            }else{
                setErrMsg('login gagal')
            }
        }
    }

    return (
        <div className={`  ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <div className="w-full bg-white p-6 my-6">
                    <div className='p-3 border-b border-slate-200'>
                        <h2 className={`${styles.title}`}>{state ? 'Edit' : 'Buat' } Info</h2>
                    </div>
                    <div className="relative">
                    <p ref={errRef} className={errMsg ? "font-poppins text-rose-600 text-sm" : "hidden"} aria-live='assertive'>{errMsg}</p>
                        <form className='w-full flex flex-col sm:flex-row' onSubmit={handleSubmit}>
                            <div className='my-3 flex flex-col gap-3 w-full py-3 order-1 sm:order-none'>
                                <div className='px-6 flex flex-col sm:flex-row items-center'>
                                    <label className='sm:w-40 p-3 inline-block font-poppins font-semibold text-sm sm:text-base text-slate-500' htmlFor="title">Title</label>
                                    <div className="w-full">
                                        <input ref={titleRef} className='w-full p-3 border rounded-md focus:outline-1 font-poppins text-base outline-green-300 border-slate-300 bg-white text-slate-600' type="text" name='title' placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)} />
                                        <p ref={errRef} className={errTitleMsg ? "font-poppins text-rose-600 text-sm" : "hidden"} aria-live='assertive'>{errTitleMsg}</p>
                                    </div>
                                </div>
                                <div className='px-6 flex flex-col sm:flex-row items-center'>
                                    <label className='sm:w-40 p-3 inline-block font-poppins font-semibold text-sm sm:text-base text-slate-500' htmlFor="image">Gambar</label>
                                    <div className="w-full">
                                        <input ref={imageRef} className='w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-600 hover:file:bg-green-200' type="file" name="image" id="image" onChange={onImageUpload} />
                                        <p ref={errRef} className={errImageMsg ? "font-poppins text-rose-600 text-sm" : "hidden"} aria-live='assertive'>{errImageMsg}</p>
                                    </div>
                                </div>
                                <div className='px-6 pb-12 sm:p-0'>
                                    <TextEditor value={body} onChange={setBody}/>
                                </div>
                            </div>
                            <div className='w-full sm:w-[300px] bg-slate-50 flex-shrink-0'>
                                <div className='w-full p-3 border-b border-slate-300 flex flex-col gap-3'>
                                    <div className='flex gap-6 justify-between'>
                                        <button className={`${styles.button} rounded-lg text-white bg-green-400 hover:bg-green-600`}>Simpan</button>
                                        <Link to={'/'} className={`${styles.button} rounded-lg text-white bg-rose-400 hover:bg-rose-600`} >Batal</Link>
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

export default FormArticle