import React from 'react'

const Search = ({news,setSearchResult}) => {
    const handleSubmit = (e)=>e.preventDefault()
    const handleSearchChange = (e)=>{
        if(!e.target.value) return setSearchResult(news)

        const result = news.filter(news => news.title.toLowerCase().includes(e.target.value))
        return setSearchResult(result)
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input id='search' onChange={handleSearchChange} className='w-full p-3 border border-slate-200 bg-slate-100 text-base text-slate-600 font-poppins outline-none rounded-lg leading-3' type="text" placeholder='Cari...' />
            </form>
        </>
    )
}

export default Search