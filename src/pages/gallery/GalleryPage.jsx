import React, {useCallback, useEffect, useRef, useState } from 'react'
import { SkeletonImage } from '../../components/Skeletone'
import styles from '../../style'
import { baseURL } from '../../api/axios'
import { editBtn,addBtn,deleteBtn } from '../../assets'
import ModalImg from '../../components/ModalImg'
import ModalGallery from './ModalGallery'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import useAuth from '../../hooks/useAuth'
import Notif from '../../components/notif'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getAllGallery, nextGallery, removeGallery } from '../../redux/feature/gallery'

function GalleryPage() {
    const {image,page,lastPage,nextPage,perPage} = useSelector((state)=>({...state.gallery}))
    const gallery = image
    const {currentUser} = useAuth()
    const dispatch = useDispatch()
    const effRef = useRef(false)
    const itemObserver = useRef()
    const lastItemRef = useCallback(node =>{
        if(itemObserver.current) itemObserver.current.disconnect()
        itemObserver.current = new IntersectionObserver((entries)=>{
            if(nextPage !== lastPage){
                if(entries[0].isIntersecting){
                    handleLoad()
                }
            }
        })
        if(node) itemObserver.current.observe(node)
    },[nextPage])
    const init = useCallback(()=>{
        dispatch(getAllGallery({page,perPage}))
    },[dispatch])
    useEffect(()=>{
        if(effRef.current == true){
            init()
        } return ()=>effRef.current = true
    },[init])

    const [clickedImg, setClickedImg] = useState(null);
    const [imageTitle,setImageTitle] = useState('')
    const [currentIndex, setCurrentIndex] = useState(null);
    const [st,setSt] = useState(null)

    const handleClick = (item, index) => {
        setCurrentIndex(index);
        setClickedImg(item.image);
        setImageTitle(item.title)
    };

    const handelRotationRight = () => {
        const totalLength = gallery.length;
        if (currentIndex + 1 >= totalLength) {
            setCurrentIndex(0);
            const newTitle = gallery[0].title
            const newUrl = gallery[0].image;
            setImageTitle(newTitle);
            setClickedImg(newUrl);
            return;
        }
        const newIndex = currentIndex + 1;
        const newUrl = gallery.filter((item) => {
            return gallery.indexOf(item) === newIndex;
        });
        const newItem = newUrl[0].image;
        const newTitle = newUrl[0].title;
        setImageTitle(newTitle)
        setClickedImg(newItem);
        setCurrentIndex(newIndex);
    };

    const handelRotationLeft = () => {
        const totalLength = gallery.length;
        if (currentIndex === 0) {
            setCurrentIndex(totalLength - 1);
            const newTitle = gallery[totalLength - 1].title
            const newUrl = gallery[totalLength - 1].image;
            setImageTitle(newTitle);
            setClickedImg(newUrl);
            return;
        }
        const newIndex = currentIndex - 1;
        const newUrl = gallery.filter((item) => {
            return gallery.indexOf(item) === newIndex;
        });
        const newItem = newUrl[0].image;
        const newTitle = newUrl[0].title;
        setClickedImg(newItem);
        setImageTitle(newTitle)
        setCurrentIndex(newIndex);
    };

    const handleClickEdit = (item) => {
        setSt(item);
    };

    const handleLoad = ()=>{
        dispatch(nextGallery({nextPage,perPage}))
    }

    const handleDelete = async (e)=>{
        try {
            const id = e.target.id
            dispatch(removeGallery({id,toast,init}))
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
                <div id='content' className="w-full bg-white p-6 my-6">
                    <div className='relative p-3 mb-3 border-b border-slate-200 flex justify-between items-center'>
                        <h2 className={`${styles.title}`}>Galeri</h2>
                        {currentUser?.role === 'superadmin' && 
                        <button className={`${styles.buttonImg} bg-purple-500 hover:bg-purple-600 text-white rounded-full absolute right-0`} onClick={()=>handleClickEdit(gallery)}>
                            <img className='w-8 h-8' src={`${addBtn}`} alt='btn' />
                            <span className='pr-1 text-sm font-poppins'>Tambah</span>
                        </button>}
                    </div>
                    {<div className='min-h-[608px] grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3'>
                        {gallery && gallery.map((img,index)=>(
                            gallery.length === index+1 ?
                            currentUser?.role === 'superadmin' ?
                            <div key={img.id} ref={lastItemRef} className='relative group w-full min-h-[200px] flex items-center overflow-hidden'>
                                <img className='h-full w-full object-cover cursor-pointer' src={`${baseURL + img.image}`} onClick={() => handleClick(img, index)} alt='imageGallery' />
                                <div className='absolute flex visible sm:invisible bottom-0 sm:-bottom-3 w-full justify-between p-6 group-hover:visible group-hover:bottom-0 bg-gradient-to-t from-slate-800 to-transparent ease-in-out duration-100'>
                                    <button className={`${styles.buttonImg} visible sm:group-hover:visible sm:invisible bg-sky-500 hover:bg-sky-600 text-white rounded-full`}  state={img} onClick={()=>handleClickEdit(img)}>
                                        <img className='w-8 h-8' src={`${editBtn}`} alt='btn' />
                                        <span className='pr-1 hidden sm:block'>Edit</span>
                                    </button>
                                    <button className={`${styles.buttonImg} visible sm:group-hover:visible sm:invisible bg-rose-500 hover:bg-rose-600 text-white rounded-full`} onClick={handleDelete}>
                                        <img className='w-8 h-8' src={`${deleteBtn}`} alt='btn' />
                                        <span id={img.id} className='pr-1 hidden sm:block'>Hapus</span>
                                    </button>
                                </div>
                            </div> :
                            <LazyLoadImage effect='blur' key={index} className='h-[200px] w-full object-cover cursor-pointer' src={baseURL + img.image} placeholderSrc={baseURL + img.thumbnail_image} onClick={() => handleClick(img, index)} alt='imageGallery' />
                            
                            : currentUser?.role === 'superadmin' ?
                            <div key={img.id} className='relative group w-full min-h-[200px] flex items-center overflow-hidden'>
                                <img className='h-full w-full object-cover cursor-pointer' src={`${baseURL + img.image}`} onClick={() => handleClick(img, index)} alt='imageGallery' />
                                <div className='absolute flex visible sm:invisible bottom-0 sm:-bottom-3 w-full justify-between p-6 group-hover:visible group-hover:bottom-0 bg-gradient-to-t from-slate-800 to-transparent ease-in-out duration-100'>
                                    <button className={`${styles.buttonImg} visible sm:group-hover:visible sm:invisible bg-sky-500 hover:bg-sky-600 text-white rounded-full`}  state={img} onClick={()=>handleClickEdit(img)}>
                                        <img className='w-8 h-8' src={`${editBtn}`} alt='btn' />
                                        <span className='pr-1 hidden sm:block'>Edit</span>
                                    </button>
                                    <button className={`${styles.buttonImg} visible sm:group-hover:visible sm:invisible bg-rose-500 hover:bg-rose-600 text-white rounded-full`} onClick={handleDelete}>
                                        <img className='w-8 h-8' src={`${deleteBtn}`} alt='btn' />
                                        <span id={img.id} className='pr-1 hidden sm:block'>Hapus</span>
                                    </button>
                                </div>
                            </div> :
                            <LazyLoadImage effect='blur' key={index} className='h-[200px] w-full object-cover cursor-pointer' src={baseURL + img.image} placeholderSrc={baseURL + img.thumbnail_image} onClick={() => handleClick(img, index)} alt='imageGallery' />
                            )).sort((a,b)=>b.id - a.id)}
                        <div>
                            {clickedImg && (
                            <ModalImg
                                clickedImg={clickedImg}
                                imageTitle={imageTitle}
                                handelRotationRight={handelRotationRight}
                                setClickedImg={setClickedImg}
                                handelRotationLeft={handelRotationLeft}
                            />
                            )}
                        </div>
                        <div>
                            {st && (
                            <ModalGallery
                                st={st}
                                setSt={setSt}
                                init={init}
                            />
                            )}
                        </div>
                    </div>}
                    <div className="w-full flex justify-center">
                        {nextPage !== lastPage ? <button className='px-3 py-2 bg-sky-600 text-white font-semibold rounded-md' onClick={handleLoad}>Load More</button> : <span className='text-slate-400 text-sm'>tidak ada gambar lagi</span>}
                    </div>
                </div>
                <Notif/>
        </>
    )
}

export default GalleryPage