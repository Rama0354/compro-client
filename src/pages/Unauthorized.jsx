const Unauthorized = () => {
    return (
        <div className='w-full bg-white mt-16 relative'>
            <button className='py-2 px-3 rounded-lg text-white bg-sky-500 hover:bg-sky-600 text-base font-poppins' onClick={notif}>alert</button>
            <div id='al' className={`absolute pointer-events-none top-0 right-0 w-full max-w-sm p-6 bg-white rounded-lg flex flex-col justify-center items-center shadow-md`}>
                <svg className='fill-green-600 w-12 h-12' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4l4.25 4.25ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"/></svg>
                <div>
                    <h1 className='font-poppins font-semibold text-lg text-green-600'>Berhasil</h1>
                </div>
                <div>
                    <h1 className='font-poppins text-base text-slate-600'>Data berhasil di simpan</h1>
                </div>
            </div>
        </div>
    )
}

export default Unauthorized