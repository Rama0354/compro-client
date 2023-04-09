import { Route, Routes } from "react-router-dom"
import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { getGallery, getInfo, getNews, getSettings, getSlider } from "./api/axios"
import RequireAuth from "./components/RequireAuth"
import Unauthorized from "./pages/Unauthorized"
import UserForm from "./pages/user/UserForm"
import { toast } from "react-toastify"

const LoginPage = lazy(()=>import('./pages/LoginPage'))
const Layout = lazy(()=>import('./pages/Layout'))
const HomePage = lazy(()=>import('./pages/HomePage'))
const NewsPage = lazy(()=>import('./pages/news/NewsPage'))
const SingleNewsPage = lazy(()=>import('./pages/news/SingleNewsPage'))
const FormNews = lazy(()=>import('./pages/news/FormNews'))
const GalleryPage = lazy(()=>import('./pages/gallery/GalleryPage'))
const AboutPage = lazy(()=>import('./pages/about/AboutPage'))
const FormArticle = lazy(()=>import('./pages/article/FormArticle'))
const WebSettings = lazy(()=>import('./pages/setting/WebSettings'))

function App() {
  const [slider,setSlider] = useState([])
  const [infos,setInfos] = useState([])
  const [gallery,setGallery] = useState([])
  const [news,setNews] = useState([])
  const [newsSearch,setNewsSearch] = useState([])
  const [searchResult,setSearchResult] = useState([])
  const [setting,setSetting] = useState([])
  const [loading,setLoading] = useState(false)
  const effectRan = useRef(false)

  const fetchSlider = async ()=>{
    try {
        setLoading(true)
        getSlider().then(data=>setSlider(data))
    } catch (error) {
        console.log(error)
    }
  }
  const fetchInfo = async ()=>{
    try {
        setLoading(true)
        getInfo().then(data=>setInfos(data))
    } catch (error) {
        console.log(error)
    }
  }
  const fetchGallery = async ()=>{
    try {
        setLoading(true)
        getGallery().then(data=>setGallery(data))
    } catch (error) {
        console.log(error)
    }
  }
  const fetchNews = async ()=>{
    try {
        setLoading(true)
        getNews().then(data=>setNews(data))
    } catch (error) {
        console.log(error)
    }
  }
  const fetchNewsSearch = async ()=>{
    try {
      setLoading(true)
      getNews().then(data =>{
          setNewsSearch(data)
          setLoading(false)
          return data
      }).then(data=>{
          setSearchResult(data)
      })
    } catch (error) {
        console.log(error)
    }
  }
  const fetchSetting = async ()=>{
    try {
        setLoading(true)
        getSettings().then(data=>setSetting(data))
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=>{
    if(effectRan.current === true){
      fetchSlider()
      fetchInfo()
      fetchGallery()
      fetchNews()
      fetchNewsSearch()
      fetchSetting()
      setLoading(false)
    }
    return ()=>{
      effectRan.current = true
    }
  },[])

  const refreshSlider = ()=>{
    fetchSlider()
    setLoading(false)
  }
  const refreshInfos = ()=>{
    fetchInfo()
    setLoading(false)
  }
  const refreshGallery = ()=>{
    fetchGallery()
    setLoading(false)
  }
  const refreshNews = ()=>{
    fetchNews()
    setLoading(false)
  }
  const refreshSetting = ()=>{
    fetchSetting()
    setLoading(false)
  }

  const successNotif = () => {
    toast.success('Berhasil Disimpan!', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
  }
  const failNotif = () => {
    toast.error('Gagal Disimpan!', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
  }
  return (
      <Suspense>
        <Routes>
          <Route path="/" element={<Layout setting={setting} loading={loading} newsSearch={newsSearch} searchResult={searchResult} setSearchResult={setSearchResult} />}>
            <Route index element={
              <HomePage 
              slider={slider}
              refreshSlider={refreshSlider}
              infos={infos} 
              refreshInfos={refreshInfos} 
              gallery={gallery}
              news={news} 
              setting={setting} 
              loading={loading} 
              successNotif={successNotif} 
              failNotif={failNotif}/>
            }/>
            <Route path="/berita" element={<NewsPage news={news}/>} />
            <Route path="/galeri" element={<GalleryPage gallery={gallery} loading={loading} successNotif={successNotif} failNotif={failNotif} refreshGallery={refreshGallery} />} />
            <Route path="/tentang" element={<AboutPage setting={setting}/>} />
            <Route path="/berita/:id" element={<SingleNewsPage/>}/>
            <Route element={<RequireAuth/>}>
              <Route path="/berita/form" element={<FormNews refreshNews={refreshNews} successNotif={successNotif}/>} />
              <Route path="/info/form" element={<FormArticle successNotif={successNotif} failNotif={failNotif} refreshInfos={refreshInfos}/>} />
              <Route path="/settings" element={<WebSettings refreshSetting={refreshSetting} successNotif={successNotif} failNotif={failNotif}/>} />
              <Route path="/user/form" element={<UserForm successNotif={successNotif} failNotif={failNotif}/>} />
            </Route>
            <Route path="/unauthorized" element={<Unauthorized/>} />
          </Route>
          <Route path="/login" element={<LoginPage setting={setting}/>}/>
        </Routes>
      </Suspense>
  )
}

export default App