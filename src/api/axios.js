import axios from "axios";
import Cookies from "universal-cookie"
export const baseURL = 'http://localhost:8000/'
const cookies = new Cookies()

export const api = axios.create({
    baseURL: 'http://localhost:8000/api'
})

export const getSlider = async ()=>{
    const res = await api.get('/v1/slider');
    return res.data.data
}
export const createSlider = async (data)=>{
    await api.post(`/v1/slider`,data,{headers: {
        Authorization : `Bearer ${cookies.get('auth').token?.access_token}`
    }})
}
export const updateSlider = async (id,data)=>{
    await api.post(`/v1/slider/${id}`,data,{headers: {
        Authorization : `Bearer ${cookies.get('auth').token?.access_token}`
    }})
}
export const deleteSlider = async (id)=>{
    await api.delete(`/v1/slider/${id}`,{headers: {
        Authorization : `Bearer ${cookies.get('auth').token?.access_token}`
    }})
}

export const getInfo = async ()=>{
    const res = await api.get('/v1/article');
    return res.data.data
}
export const createInfo = async (data)=>{
    await api.post(`/v1/article`,data,{headers: {
        Authorization : `Bearer ${cookies.get('auth').token?.access_token}`
    }})
}
export const updateInfo = async (id,data)=>{
    await api.post(`/v1/article/${id}`,data,{headers: {
        Authorization : `Bearer ${cookies.get('auth').token?.access_token}`
    }})
}
export const deleteInfo = async (id)=>{
    await api.delete(`/v1/article/${id}`,{headers: {
        Authorization : `Bearer ${cookies.get('auth').token?.access_token}`
    }})
}

export const getNews = async ()=>{
    const res = await api.get('/v1/news');
    return res.data.data
}
export const getNewsId = async (id)=>{
    const res = await api.get(`/v1/news/${id}`);
    return res.data.data
}
export const createNews = async (data)=>{
    await api.post(`/v1/news`,data,{headers: {
        withCredentials:true,
        Authorization : `Bearer ${cookies.get('auth').token?.access_token}`
    }})
}
export const updateNews = async (id,data)=>{
    await api.post(`/v1/news/${id}`,data,{headers: {
        withCredentials:true,
        Authorization : `Bearer ${cookies.get('auth').token?.access_token}`
    }})
}
export const deleteNews = async (id)=>{
    await api.delete(`/v1/news/${id}`,{headers: {
        Authorization : `Bearer ${cookies.get('auth').token?.access_token}`
    }})
}

export const getGallery = async ()=>{
    const res = await api.get('/v1/gallery')
    return res.data.data
}
export const createGallery = async (data)=>{
    await api.post(`/v1/gallery`,data,{headers: {
        Authorization : `Bearer ${cookies.get('auth').token?.access_token}`
    }})
}
export const updateGallery = async (id,data)=>{
    await api.post(`/v1/gallery/${id}`,data,{headers: {
        Authorization : `Bearer ${cookies.get('auth').token?.access_token}`
    }})
}
export const deleteGallery = async (id)=>{
    await api.delete(`/v1/gallery/${id}`,{headers: {
        Authorization : `Bearer ${cookies.get('auth').token?.access_token}`
    }})
}

export const getSettings = async ()=>{
    const res = await api.get('/v1/setting');
    return res.data.data
}
export const updateSettings = async (data)=>{
    await api.post(`/v1/setting`,data,{headers: {
        Authorization : `Bearer ${cookies.get('auth').token?.access_token}`
    }})
}