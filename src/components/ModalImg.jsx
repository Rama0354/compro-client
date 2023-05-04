import { LazyLoadImage } from "react-lazy-load-image-component";
import { baseURL } from "../api/axios";
import { arLeft, arRight, deleteBtn } from "../assets";

const ModalImg = ({clickedImg,clickedImgThumb,imageTitle,setClickedImg,handelRotationRight,handelRotationLeft}) => {
const handleClick = (e) => {
    if (e.target.classList.contains("dismiss")) {
    setClickedImg(null);
    }
};

return (
    <>
    <div className="fixed z-10 top-0 left-0 right-0 bg-slate-600/50 w-full h-full flex justify-center items-center backdrop-blur-sm dismiss" onClick={handleClick}>
        <div className="relative">
            <LazyLoadImage effect="blur" className="w-full sm:w-[900px]" src={baseURL+clickedImg} placeholderSrc={baseURL+clickedImgThumb} alt="bigger pic"/>
            <div className="absolute bottom-0 p-6 w-full bg-gradient-to-t from-slate-600 to-transparent delay-150">
                <h3 className="font-poppins font-semibold text-lg text-white leading-relaxed">{imageTitle}</h3>
            </div>
            <div className="absolute top-3 right-3 cursor-pointer bg-slate-300/50 rounded-full hidden">
                <div className="flex justify-center items-center">
                    <img onClick={handleClick} className="w-10 h-10 dismiss" src={`${deleteBtn}`} alt="button" />
                </div>
            </div>
            <div onClick={handelRotationLeft} className="absolute top-1/2 left-0 cursor-pointer">
                <div className="flex justify-center items-center hover:bg-slate-300/50 -translate-y-1/2">
                    <img className="w-10 h-10" src={`${arLeft}`} alt="button" />
                </div>
            </div>
            <div onClick={handelRotationRight} className="absolute top-1/2 right-0 cursor-pointer">
                <div className="flex justify-center items-center hover:bg-slate-300/50 -translate-y-1/2">
                    <img className="w-10 h-10" src={`${arRight}`} alt="button" />
                </div>
            </div>
        </div>
    </div>
    </>
);
};

export default ModalImg;