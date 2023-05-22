const Search = ({news,setSc}) => {
    const handleSubmit = (e)=>e.preventDefault()
    const handleSearchChange = (e)=>{
        if(!e.target.value){
            return setSc(news)
        } else{
            const result = news.filter(news => news.title.toLowerCase().includes(e.target.value))
            return setSc(result)
        }
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