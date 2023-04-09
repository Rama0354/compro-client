import React,{useState,useEffect} from 'react'
import styles from '../../style'
import { api, baseURL, getNewsId } from '../../api/axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { editBtn,deleteBtn } from '../../assets'
import useAuth from '../../hooks/useAuth'
import { SkeletonNewsPageDetail } from '../../components/Skeletone'

function SingleNewsPage(props) {
    const [news,setNews] = useState([]);
    const [img,setImg] = useState(null)
    const [loading,setLoading] = useState(false)
    const params = useParams();
    const navigate = useNavigate()

    const {currentUser} = useAuth()

    useEffect(()=>{
        setLoading(true)
        const fetchData = async()=>{
            try{
                getNewsId(params.id).then(data =>{
                    setNews(data)
                    setImg(baseURL + data.image)
                    setLoading(false)
                })
            }catch(err){
                console.log(err)
            }
        }
        fetchData()
    },[params])

    const handleDelete = async ()=>{
        try {
            await api.delete(`/v1/news/${params.id}`,{headers: {
                Authorization : `Bearer ${JSON.parse(localStorage.getItem("user")).token.access_token}`
            }});
            navigate("/berita")
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="w-full bg-white p-6 my-6">
            <div className='relative p-3 border-b border-slate-200 flex justify-between items-center'>
                <h2 className={`${styles.title}`}>{news.title}</h2>
                {currentUser && 
                    <div className='absolute right-0 flex'>
                        <Link className={`${styles.buttonImg} bg-sky-500 hover:bg-sky-600 text-white rounded-full mr-1`} state={news} to={'/berita/form'}>
                            <img className='w-8 h-8' src={`${editBtn}`} alt='button' />
                            <span className='pr-1 hidden sm:block'>Edit</span>
                        </Link> 
                        <Link className={`${styles.buttonImg} bg-rose-500 hover:bg-rose-600 text-white rounded-full`} onClick={handleDelete}>
                            <img className='w-8 h-8' src={`${deleteBtn}`} alt='button' />
                            <span className='pr-1 hidden sm:block'>Hapus</span>
                        </Link>
                    </div>
                }
            </div>
            <div className='w-full my-3 flex flex-col gap-6'>
                {loading ?
                    <SkeletonNewsPageDetail/>
                :
                <>
                    <div className=' h-48 sm:h-96 overflow-hidden flex items-center'>
                        <img src={`${img}`} alt="ptbimage" />
                    </div>
                    <div className={`${styles.paragraph}`} dangerouslySetInnerHTML={{__html: news.body}}></div>
                </>
                }
            </div>
        </div>
    )
}

export default SingleNewsPage