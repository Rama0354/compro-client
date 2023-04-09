import React, { Fragment, useState } from 'react'
import { SkeletonImage } from '../../components/Skeletone'
import styles from '../../style'
import { api, baseURL, deleteGallery } from '../../api/axios'
import { editBtn,addBtn,deleteBtn } from '../../assets'
import ModalImg from '../../components/ModalImg'
import ModalGallery from './ModalGallery'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import useAuth from '../../hooks/useAuth'
import Notif from '../../components/notif'

function GalleryPage({gallery,loading,successNotif,failNotif,refreshGallery}) {
    const img = gallery
    const {currentUser} = useAuth()

    const [clickedImg, setClickedImg] = useState(null);
    const [imageTitle,setImageTitle] = useState('')
    const [currentIndex, setCurrentIndex] = useState(null);
    const [st,setSt] = useState(null)

    const handleClick = (item, index) => {
        setCurrentIndex(index);
        setClickedImg(item.image);
        setImageTitle(item.title)
    };

    const handelRotationLeft = () => {
        const totalLength = img.length;
        if (currentIndex + 1 >= totalLength) {
            setCurrentIndex(0);
            const newTitle = img[0].title
            const newUrl = img[0].image;
            setImageTitle(newTitle);
            setClickedImg(newUrl);
            return;
        }
        const newIndex = currentIndex + 1;
        const newUrl = img.filter((item) => {
            return img.indexOf(item) === newIndex;
        });
        const newItem = newUrl[0].image;
        const newTitle = newUrl[0].title;
        setImageTitle(newTitle)
        setClickedImg(newItem);
        setCurrentIndex(newIndex);
    };

    const handelRotationRight = () => {
        const totalLength = img.length;
        if (currentIndex === 0) {
            setCurrentIndex(totalLength - 1);
            const newTitle = img[totalLength - 1].title
            const newUrl = img[totalLength - 1].image;
            setImageTitle(newTitle);
            setClickedImg(newUrl);
            return;
        }
        const newIndex = currentIndex - 1;
        const newUrl = img.filter((item) => {
            return img.indexOf(item) === newIndex;
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

    const handleDelete = async (e)=>{
        try {
            const res = deleteGallery(e.target.id)
            res.then(()=>{
                successNotif()
                refreshGallery()
            }).catch(error=>{
                console.log(error?.response?.message)
            })
        } catch (err) {
            failNotif()
            console.log(err)
        }
    }
    return (
        <Fragment>
                <div className="w-full bg-white p-6 my-6">
                    <div className='relative p-3 mb-3 border-b border-slate-200 flex justify-between items-center'>
                        <h2 className={`${styles.title}`}>Galeri</h2>
                        {currentUser?.role === 'superadmin' && 
                        <button className={`${styles.buttonImg} bg-purple-500 hover:bg-purple-600 text-white rounded-full absolute right-0`} onClick={()=>handleClickEdit(img)}>
                            <img className='w-8 h-8' src={`${addBtn}`} alt='btn' />
                            <span className='pr-1 text-sm font-poppins'>Tambah</span>
                        </button>}
                    </div>
                    {loading ? 
                        <article className='min-h-[608px] grid grid-cols-3 gap-1 items-start'>
                            <SkeletonImage/>
                            <SkeletonImage/>
                            <SkeletonImage/>
                        </article>
                    : <div className='min-h-[608px] grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3'>
                        {img.map((img,index)=>(
                            currentUser?.role === 'superadmin' ?
                            <div key={index} className='relative group w-full min-h-[200px] flex items-center overflow-hidden'>
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
                                successNotif={successNotif}
                                failNotif={failNotif}
                                reload={refreshGallery}
                            />
                            )}
                        </div>
                    </div>}
                </div>
                <Notif/>
        </Fragment>
    )
}

export default GalleryPage