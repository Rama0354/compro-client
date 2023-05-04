import React,{useEffect, useRef, useCallback, useState} from 'react'
import styles from '../../style'
import { baseURL } from '../../api/axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { editBtn,deleteBtn } from '../../assets'
import useAuth from '../../hooks/useAuth'
import { SkeletonNewsPageDetail } from '../../components/Skeletone'
import { useDispatch, useSelector } from 'react-redux'
import { delNews, getNewsById } from '../../redux/feature/news'
import { toast } from 'react-toastify'

function SingleNewsPage() {
    const {newsId,loading} = useSelector((state)=>({...state.news}))
    const [img,setImg] = useState('')
    const params = useParams().id
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {currentUser} = useAuth()
    const effectRun = useRef(false)

    const init = useCallback(()=>{
        const id = params
        dispatch(getNewsById({id})).then((data)=>setImg(baseURL+data?.payload?.image))
    },[params])
    
    useEffect(()=>{
        if(effectRun.current == true){
            init()
        }
        return ()=> effectRun.current = true
    },[init])

    const handleDelete = ()=>{
        const id = params
        dispatch(delNews({id,navigate,toast}))
    }

    return (
        <div className="w-full bg-white p-6 my-6">
            <div className='relative p-3 border-b border-slate-200 flex justify-between items-center'>
                <h2 className={`${styles.title}`}>{newsId.title}</h2>
                {currentUser && 
                    <div className='absolute right-0 flex'>
                        <Link className={`${styles.buttonImg} bg-sky-500 hover:bg-sky-600 text-white rounded-full mr-1`} state={newsId} to={'/berita/form'}>
                            <img className='w-8 h-8' src={`${editBtn}`} alt='button' />
                            <span className='pr-1 hidden sm:block'>Edit</span>
                        </Link> 
                        <button className={`${styles.buttonImg} bg-rose-500 hover:bg-rose-600 text-white rounded-full`} onClick={()=>handleDelete()}>
                            <img className='w-8 h-8' src={`${deleteBtn}`} alt='button' />
                            <span className='pr-1 hidden sm:block'>Hapus</span>
                        </button>
                    </div>
                }
            </div>
            <div className='w-full my-3 flex flex-col gap-6'>
                {loading ?
                    <SkeletonNewsPageDetail/>
                :
                <>
                    <div className=' h-48 sm:h-96 overflow-hidden flex items-center'>
                        <img src={img} alt="ptbimage" />
                    </div>
                    <div className={`${styles.paragraph}`} dangerouslySetInnerHTML={{__html: newsId.body}}></div>
                </>
                }
            </div>
        </div>
    )
}

export default SingleNewsPage