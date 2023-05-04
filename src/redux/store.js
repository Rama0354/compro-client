import { configureStore } from "@reduxjs/toolkit";
import infoReducer from './feature/info'
import sliderReducer from './feature/slider'
import newsReducer from './feature/news'
import galleryReducer from './feature/gallery'
import settingReducer from './feature/setting'

const reducer = {
    info: infoReducer,
    slider: sliderReducer,
    news: newsReducer,
    gallery: galleryReducer,
    setting: settingReducer
}

const store = configureStore({
    reducer:reducer,
    devTools:true
})

export default store