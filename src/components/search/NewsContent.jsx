import React from 'react'
import { Link } from 'react-router-dom'

const NewsContent = ({news}) => {
    return (
        <article className={`flex gap-1`}>
            <div className='flex flex-col gap-1'>
                <Link to={`/berita/${news.id}`} className='font-semibold text-slate-600 hover:text-green-600 leading-4'>{news.title}</Link>
                <span className='font-thin text-slate-600 text-sm'>{news.author.name}, {news.fcreated_at}</span>
            </div>
        </article>
    )
}

export default NewsContent