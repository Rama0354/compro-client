import { useRef, useState, useEffect } from "react";
import {baseURL, createGallery, updateGallery} from "../../api/axios";
import styles from "../../style";

const ModalGallery = ({st,setSt,reload,successNotif,failNotif}) => {
    const [title,setTitle] = useState(st.id ? st.title : '')
    const [image,setImage] = useState(null)
    const [preview, setPreview] = useState()

    const effectRan = useRef(false)
    const errRef = useRef()
    const titleRef = useRef()
    const imageRef = useRef()

    const [errMsg,setErrMsg] = useState('')
    const [errTitleMsg,setErrTitleMsg] = useState('')
    const [errImageMsg,setErrImageMsg] = useState('')

    useEffect(()=>{
        if(effectRan.current === true){
            titleRef.current.focus()
            imageRef.current.focus()
        }
        return ()=> effectRan.current = true
    },[])
    useEffect(()=>{
        setErrMsg('')
        setErrTitleMsg('')
        setErrImageMsg('')
    },[title,image])

const onImageUpload = (e)=>{
    const file = e.target.files[0]
    setImage(file)
    setPreview(URL.createObjectURL(file))
}

const handleClick = (e) => {
    if (e.target.classList.contains("dismiss")) {
        setSt(null);
    }
};

const handleSubmit = async (e)=>{
    const data = new FormData()
    data.set('title',title)
    if(st.id){
        image == null ? '' : data.set('image',image)
    }else{
        data.set('image',image)
    }
    e.preventDefault()
    try {
        const res =
        st.id ? updateGallery(st.id,data)
        : createGallery(data)

        res.then(()=>{
            setSt(null)
            reload(true)
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
    } catch (error) {
        console.log(error)
    }

}

return (
    <>
    <div className="fixed top-0 left-0 right-0 bg-slate-600/25 w-full h-full flex justify-center items-center backdrop-blur-sm dismiss" onClick={handleClick}>
        <div className="relative max-w-xs xs:w-max-sm sm:max-w-lg bg-white rounded-md animate-fadeIn">
            <div className="flex justify-between items-center p-3 border-b border-slate-200">
                <h2 className="font-poppins font-semibold text-lg text-slate-600 py-1 px-2">{st.id ? 'Edit' : 'Tambah'} Gambar</h2>
                <span className="dismiss hover:bg-slate-300 flex py-1 px-2 justify-center items-center text-lg font-poppins font-semibold cursor-pointer duration-150 text-slate-600" onClick={handleClick}>&times;</span>
            </div>
            <div className="w-full p-3">
                {st.id ?
                    image == null ? <img src={baseURL+st.image} width={'100%'} height={100} alt="gallery"/> : <img src={preview} width={'100%'} height={100} alt="gallery"/> 
                :
                    image == null ? "" : <img src={preview} width={'100%'} height={100} alt="gallery"/> 
                }
                <form className='my-3 flex flex-col gap-3' onSubmit={handleSubmit}>
                    <p ref={errRef} className={errMsg ? "font-poppins text-rose-600 text-sm" : "hidden"} aria-live='assertive'>{errMsg}</p>
                    <div className='p-1 flex flex-col sm:flex-row items-center'>
                        <label className='p-3 inline-block font-poppins font-semibold text-sm sm:text-base text-slate-500' htmlFor="title">Title</label>
                        <div className="w-full">
                            <input ref={titleRef} className='w-full p-3 border rounded-md focus:outline-1 font-poppins text-base outline-green-300 border-slate-300 bg-white text-slate-600' type="text" name='title' placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)} />
                            <p ref={errRef} className={errTitleMsg ? "font-poppins text-rose-600 text-sm" : "hidden"} aria-live='assertive'>{errTitleMsg}</p>
                        </div>
                    </div>
                    <div className='p-1 flex flex-col sm:flex-row items-center'>
                        <label className='p-3 inline-block font-poppins font-semibold text-sm sm:text-base text-slate-500' htmlFor="cover">Gambar</label>
                        <div className="w-full">
                            <input ref={imageRef} className='w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-600 hover:file:bg-green-200' type="file" name="cover" id="cover" onChange={e=>onImageUpload(e)} />
                            <p ref={errRef} className={errImageMsg ? "font-poppins text-rose-600 text-sm" : "hidden"} aria-live='assertive'>{errImageMsg}</p>
                        </div>
                    </div>
                    <div className='flex gap-6 justify-center'>
                        <button className={`${styles.button} rounded-lg text-white bg-green-400 hover:bg-green-600`}>Simpan</button>
                        <button className={`${styles.button} text-white bg-rose-400 rounded-lg dismiss`} onClick={handleClick}>Batal</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
);
};

export default ModalGallery;