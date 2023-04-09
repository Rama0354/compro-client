import React from 'react'
import NewsContent from './NewsContent'

const ListNews = ({searchResult}) => {
    const results = searchResult.filter(news => news.is_publish === 'y').reverse().map((news,index) => (<NewsContent key={index} news={news} />))
    const content = results?.length ? results : <article><p>tidak ditemukan</p></article>
    return (
        <main>{content}</main>
    )
}

export default ListNews