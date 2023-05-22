import { Route, Routes } from "react-router-dom"
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react"
import RequireAuth from "./components/RequireAuth"
import Unauthorized from "./pages/Unauthorized"
import UserForm from "./pages/user/UserForm"
import { useDispatch, useSelector } from "react-redux"
import { getAllSetting } from "./redux/feature/setting"
import { getAllNews } from "./redux/feature/news"

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
    const {setting, news, page, perPage, nextPage, lastPage, totalNews, loading} = useSelector((state)=>({...state.setting, ...state.news}))
    const [sc,setSc] = useState([])
    const dispatch = useDispatch()
    const effectRun = useRef(false)
    const totalNewsRef = useRef()

    const init = useCallback(()=>{
        dispatch(getAllSetting())
        dispatch(getAllNews({page,perPage})).then((data)=>{setSc(data.payload?.data);totalNewsRef.current = data.payload?.meta.total})
    },[dispatch])
    useEffect(()=>{
        if(effectRun.current == true){
            init()
        }
        return ()=> effectRun.current = true
    },[init])
  return (
      <Suspense>
        <Routes>
          <Route path="/" element={<Layout setting={setting} news={news} sc={sc} setSc={setSc} />}>
            <Route index element={
              <HomePage 
              setting={setting}
              loading={loading} />
            }/>
            <Route path="/berita" element={
              <NewsPage news={news}
                page={page}
                perPage={perPage}
                lastPage={lastPage}
                nextPage={nextPage}
                totalNews={totalNews} 
                totalNewsRef={totalNewsRef} 
                loading={loading} />
            } />
            <Route path="/galeri" element={<GalleryPage loading={loading}/>} />
            <Route path="/tentang" element={<AboutPage setting={setting}/>} />
            <Route path="/berita/:id" element={<SingleNewsPage/>}/>
            <Route element={<RequireAuth/>}>
              <Route path="/berita/form" element={<FormNews init={init} />} />
              <Route path="/info/form" element={<FormArticle/>} />
              <Route path="/settings" element={<WebSettings init={init} />} />
              <Route path="/user/form" element={<UserForm/>} />
            </Route>
            <Route path="/unauthorized" element={<Unauthorized/>} />
          </Route>
          <Route path="/login" element={<LoginPage setting={setting}/>}/>
        </Routes>
      </Suspense>
  )
}

export default App