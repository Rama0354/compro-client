import React, { useEffect, useRef, useState } from 'react'
import styles from '../style'
import { baseURL, getGallery } from '../api/axios'
import { SkeletonImage } from './Skeletone'
import ModalImg from './ModalImg'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Gallery({gallery,loading}) {

    const setGallery = gallery.sort((a,b)=>b.id - a.id).slice(0,6)

    const [clickedImg, setClickedImg] = useState(null);
    const [clickedImgThumb, setClickedImgThumb] = useState(null);
    const [imageTitle,setImageTitle] = useState('');
    const [currentIndex, setCurrentIndex] = useState(null);

    const handleClick = (item, index) => {
        setCurrentIndex(index);
        setClickedImg(item.image);
        setClickedImgThumb(item.thumbnail_image);
        setImageTitle(item.title)
    };

    const handelRotationRight = () => {
        const totalLength = setGallery.length;
        if (currentIndex + 1 >= totalLength) {
            setCurrentIndex(0);
            const newTitle = setGallery[0].title
            const newUrl = setGallery[0].image;
            const newUrlThumb = setGallery[0].thumbnail_image;
            setImageTitle(newTitle);
            setClickedImg(newUrl);
            setClickedImgThumb(newUrlThumb);
            return;
        }
        const newIndex = currentIndex + 1;
        const newUrl = setGallery.filter((item) => {
            return setGallery.indexOf(item) === newIndex;
        });
        const newItem = newUrl[0].image;
        const newItemThumb = newUrl[0].thumbnail_image;
        const newTitle = newUrl[0].title;
        setImageTitle(newTitle)
        setClickedImg(newItem);
        setClickedImgThumb(newItemThumb);
        setCurrentIndex(newIndex);
    };

    const handelRotationLeft = () => {
        const totalLength = setGallery.length;
        if (currentIndex === 0) {
            setCurrentIndex(totalLength - 1);
            const newTitle = setGallery[totalLength - 1].title;
            const newUrl = setGallery[totalLength - 1].image;
            const newUrlThumb = setGallery[totalLength - 1].thumbnail_image;
            setImageTitle(newTitle);
            setClickedImg(newUrl);
            setClickedImgThumb(newUrlThumb);
            return;
        }
        const newIndex = currentIndex - 1;
        const newUrl = setGallery.filter((item) => {
            return setGallery.indexOf(item) === newIndex;
        });
        const newItem = newUrl[0].image;
        const newItemThumb = newUrl[0].thumbnail_image;
        const newTitle = newUrl[0].title;
        setClickedImg(newItem);
        setClickedImgThumb(newItemThumb);
        setImageTitle(newTitle)
        setCurrentIndex(newIndex);
    };

    return (
        <div className='w-full bg-white p p-6 my-6'>
            <div className='w-full pb-3 mb-3 border-b border-slate-200'>
                <h2 className={`${styles.heading2} text-center`}>Galeri</h2>
            </div>
            <div className='w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-6'>
                {loading ? 
                    <>
                        <SkeletonImage/>
                        <SkeletonImage/>
                        <SkeletonImage/>
                        <SkeletonImage/>
                        <SkeletonImage/>
                        <SkeletonImage/>
                    </>
                : setGallery.map((img,index)=>(
                        <LazyLoadImage
                            key={index}
                            alt="gallery"
                            effect="blur"
                            src={baseURL+img.image}
                            placeholderSrc={baseURL+img.thumbnail_image}
                            onClick={() => handleClick(img, index)}
                            className="cursor-pointer bg-slate-100 w-full h-full object-cover"
                        />
                ))}
                <div>
                    {clickedImg && (
                    <ModalImg
                        clickedImg={clickedImg}
                        clickedImgThumb={clickedImgThumb}
                        imageTitle={imageTitle}
                        handelRotationRight={handelRotationRight}
                        setClickedImg={setClickedImg}
                        handelRotationLeft={handelRotationLeft}
                    />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Gallery