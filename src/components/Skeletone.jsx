import React from 'react'

export const SkeletonNews = () => {
    return (
        <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
            <div className="flex items-center justify-center w-48 h-32 rounded bg-slate-300">
                <svg className="w-8 h-8 text-slate-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
            </div>
            <div className="w-full">
                <div className="h-2.5 rounded-full bg-slate-300 w-48 mb-4"></div>
                <div className="h-2 rounded-full bg-slate-300 mb-2.5 w-28"></div>
                <div className="h-2 rounded-full bg-slate-300 mb-2.5"></div>
                <div className="h-2 rounded-full bg-slate-300 mb-2.5"></div>
                <div className="h-3.5 rounded-full bg-slate-300 w-28"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export const SkeletonImage = () => {
    return (
        <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
            <div className="flex items-center justify-center w-full h-48 rounded bg-slate-300">
                <svg className="w-12 h-12 text-slate-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
            </div>
        </div>
    )
}

export const SkeletonNewsCard = () => {
    return (
        <div role="status" className="max-w-md p-4 border border-gray-200 rounded shadow animate-pulse md:p-6">
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded ">
                <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
            </div>
            <div className="flex items-center mt-4 space-x-3">
                <svg className="text-gray-200 w-14 h-14 00" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
                <div>
                    <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-2"></div>
                    <div className="w-48 h-2 bg-gray-200 rounded-full "></div>
                </div>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full"></div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export const SkeletonNewsSmallList = () => {
    return (
        <div role="status" className="max-w-full p-4 space-y-4 border-gray-200 divide-y divide-gray-200 rounded animate-pulse">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                    <div>
                        <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                    <div>
                        <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                    <div>
                        <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                    <div>
                        <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
    )
}

export const SkeletonAbout = () => {
    return (
        <div role="status" className="animate-pulse">
            <div className="h-2.5 bg-gray-300 rounded-full max-w-[640px] mb-2.5 mx-auto"></div>
            <div className="h-2.5 mx-auto bg-gray-300 rounded-full max-w-[540px]"></div>
            <div className="flex items-center justify-center mt-4">
                <svg className="w-10 h-10 mr-2 text-gray-200" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
                <div className="w-20 h-2.5 bg-gray-200 rounded-full mr-3"></div>
                <div className="w-24 h-2 bg-gray-200 rounded-full"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export const SkeletonInfo = () => {
    return (
        <div className="bg-white rounded-lg">
            <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
                <div className="flex items-center justify-center w-full h-48 bg-gray-300 sm:w-96">
                    <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
                </div>
                <div className="w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full max-w-[460px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export const SkeletonNewsPageDetail = () => {
    return (
        <div role="status" className="w-full p-4 rounded animate-pulse md:p-6">
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded ">
                <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}
export const SkeletonNoSlider = () => {
    return(
        <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded">
            <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
        </div>
    )
}