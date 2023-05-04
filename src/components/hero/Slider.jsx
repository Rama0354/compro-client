import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { baseURL } from '../../api/axios';
import {arLeft, arRight} from '../../assets'
import styles from '../../style';
import { addBtn,editBtn,deleteBtn } from '../../assets';
import ModalSlider from './ModalSlider'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useAuth from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSlider, removeSlider } from '../../redux/feature/slider';
import { toast } from 'react-toastify';

const Slider = () => {
    const {slides,loading} = useSelector((state)=>({...state.slider}))
    const dispatch = useDispatch()
    const [index, setIndex] = useState(0);
    const [inSlide,setInSlide] = useState()
    const [st,setSt] = useState(null)
    const eff = useRef(false)

    const init = useCallback(()=>{
        dispatch(getAllSlider()).then((data)=>{
            setInSlide(data.payload.length)
        })
    },[dispatch])
    useEffect(()=>{
        if(eff.current == true){
            init()
        } return ()=> eff.current = true
    },[init])
    
    const {currentUser} = useAuth()
    
    //back to first
    useEffect(() => {
        const i = init ? inSlide - 1 : slides.length - 1
        if (index < 0) {
            setIndex(i);
        }
        if (index > i) {
            setIndex(0);
        }
    }, [index]);

    // autoslide, clearInterval = een cleanup functie noodzakelijk bij interval
    useEffect(() => {
        let slide = setInterval(() => {
        setIndex(index + 1);
        }, 5000);
        return () => clearInterval(slide);
    }, [index]);

    const handleClickEdit = (item) => {
        setSt(item);
    };

    const handleDelete = async (e)=>{
        const id = e.target.id
        try {
            dispatch(removeSlider({id,toast})).then(()=>init())
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section className="w-full mx-auto">
            <div className="my-0 mx-auto w-full h-48 sm:h-[480px] relative flex overflow-hidden">
                {currentUser?.role == 'superadmin' && 
                <button className={`${styles.buttonImg} absolute z-10 bottom-3 right-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full`} onClick={()=>handleClickEdit(slides)}>
                    <img className='w-8 h-8' src={`${addBtn}`} alt='btn' />
                    <span className='pr-1 hidden sm:block'>Tambah</span>
                </button>}
                {slides && slides.map((img, imgIndex) => {
                    const { id, image, thumbnail_image, title } = img;
                    let position = "translate-x-[100%]"; //next
                    if (imgIndex === index) {
                        position = "opacity-100 translate-x-[0]"; //active
                    }
                    if (
                        imgIndex === index - 1 ||
                        (index === 0 && imgIndex === img.length - 1) //last
                    ) {
                        position = "translate-x-[-100%]";
                    }
                    return (
                        <article className={`absolute top-0 left-0 w-full h-full sm:h-[480px] opacity-0 transition-all duration-300 ease-linear ${position}`} key={id}>
                            <div className="w-full h-full flex items-center bg-slate-300">
                                <LazyLoadImage placeholderSrc={baseURL+thumbnail_image} effect='blur' src={baseURL+image} alt="slide" className=" w-screen h-full object-cover shadow-md" />
                            </div>
                            <div className="w-full h-48 bg-gradient-to-t from-slate-600/50 to-transparent absolute bottom-0">
                                <h4 className={`absolute z-0 ${currentUser?.role == 'superadmin' ? 'bottom-12' : 'bottom-3'} left-3 ${styles.heading2} text-white`}>{title}</h4>
                                {currentUser?.role == 'superadmin' && 
                                <div className='absolute z-0 bottom-3 left-3 flex'>
                                <button className={`${styles.buttonImg} bg-sky-500 hover:bg-sky-600 text-white rounded-full mr-1`}  state={img} onClick={()=>handleClickEdit(img)}>
                                    <img className='w-8 h-8' src={`${editBtn}`} alt='btn' />
                                    <span className='pr-1 hidden sm:block'>Edit</span>
                                </button>
                                <button onClick={handleDelete} className={`${styles.buttonImg} bg-rose-500 hover:bg-rose-600 text-white rounded-full`}>
                                    <img className='w-8 h-8' src={`${deleteBtn}`} alt='btn' />
                                    <span id={img.id} className='pr-1 hidden sm:block'>Hapus</span>
                                </button>
                                </div>}
                            </div>
                        </article>
                    );
                })}
                <div>
                    {st && (
                    <ModalSlider
                        st={st}
                        setSt={setSt}
                        init={init}
                    />
                    )}
                </div>
                <button className="absolute top-1/2 -translate-y-1/2 bg-slate-200/50 hover:bg-slate-300/50 text-slate-600 w-8 h-8 sm:w-12 sm:h-12 grid place-items-center text-lg rounded-lg cursor-pointer transition-[all_.3s_ease] left-3" onClick={() => setIndex(index - 1)}>
                    <img className='w-6 h-6 sm:w-10 sm:h-10' src={arLeft} alt="btn" />
                </button>
                <button className="absolute top-1/2 -translate-y-1/2 bg-slate-200/50 hover:bg-slate-300/50 text-slate-600 w-8 h-8 sm:w-12 sm:h-12 grid place-items-center text-lg rounded-lg cursor-pointer transition-[all_.3s_ease] right-3" onClick={() => setIndex(index + 1)}>
                    <img className='w-6 h-6 sm:w-10 sm:h-10' src={arRight} alt="btn" />
                </button>
            </div>
        </section>
    );
}

export default Slider