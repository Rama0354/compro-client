import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from '../../style'
import { baseURL, deleteInfo } from '../../api/axios'
import { Link } from 'react-router-dom'
import { addBtn,editBtn,deleteBtn } from '../../assets'
import { SkeletonInfo } from '../Skeletone'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import useAuth from '../../hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { getAllInfo } from '../../redux/feature/info'

function Infos() {
    const {currentUser} = useAuth()
    const {info,loading} = useSelector((state)=>({...state.info}))
    const [infoIndex,setInfoIndex] = useState(0)
    const dispatch = useDispatch()
    const eff = useRef(false)

    const init = useCallback(()=>{
        dispatch(getAllInfo()).then((data)=>{
            setInfoIndex(data.payload.length)
        })
    },[dispatch])
    useEffect(()=>{
        if(eff.current == true){
            init()
        } return ()=>eff.current = true
    },[init])

    const handleDelete = async (e)=>{
        e.preventDefault()
        try {
            const res = deleteInfo(e.target.id)
            res.then(()=>{
                refreshFetch()
                successNotif()
            }).catch(err=>{
                console.log(err?.response)
                failNotif()
            })
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='flex flex-col gap-6'>
            {currentUser?.role === 'superadmin' && infoIndex < 3 ?
            <>
                <div className='w-full flex justify-center p-3 border-2 border-slate-300 border-dashed'>
                    <Link to={'/info/form'} className={`${styles.buttonImg} text-white bg-purple-500 hover:bg-purple-600`} ><img className='w-8 h-8' src={`${addBtn}`} alt='button' /> <span className='mr-1 hidden sm:block'>Tambah</span></Link>
                </div>
            </> : <></>
            }
            {loading ?
            <>
                <SkeletonInfo/>
            </>
            : info && info.map((content,index)=>(
                <div key={index} className='sidebar w-full flex flex-col sm:odd:flex-row sm:even:flex-row-reverse mx-auto my-0 gap-6 rounded-2xl bg-white sm:even:rounded-r-full sm:odd:rounded-l-full'>
                    <div className='p-3 shrink-0 flex justify-center'>
                        <LazyLoadImage className='w-[140px] h-[140px] xs:w-[200px] xs:h-[200px] rounded-full object-cover' src={`${baseURL + content.image}`} placeholderSrc={`${baseURL + content.thumbnail_image}`} alt="infoptb"/>
                    </div>
                    <div className='w-full p-3'>
                        <div className='relative w-full py-1 px-3 border-b border-slate-200 flex justify-between items-center'>
                            <h2 className={`${styles.heading2}`}>{content.title}</h2>
                            {currentUser?.role === 'superadmin' && 
                            <div className='absolute right-0 flex'>
                                <Link className={`${styles.buttonImg} bg-sky-500 w-max hover:bg-sky-600 text-white mr-1`} state={content} to={'info/form'}>
                                    <img className='w-8 h-8' src={`${editBtn}`} alt='button' />
                                    <span className='pr-1 hidden sm:block'>Edit</span>
                                </Link> 
                                <Link className={`${styles.buttonImg} bg-rose-500 hover:bg-rose-600 text-white`} state={content} onClick={handleDelete}>
                                    <img className='w-8 h-8' src={`${deleteBtn}`} alt='button' />
                                    <span id={content.id} className='pr-1 hidden sm:block'>Hapus</span>
                                </Link>
                            </div>}
                        </div>
                        <div dangerouslySetInnerHTML={{__html: content.body}}></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Infos