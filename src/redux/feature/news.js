import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNews, createNews, updateNews, deleteNews, getNewsId, api } from "../../api/axios";

export const getAllNews = createAsyncThunk(
    "news/getAllNews",
    async () => {
        try {
            const res = await getNews()
            return res
        } catch (err) {
            return err.response.data
        }
    }
);
export const getNewsById = createAsyncThunk(
    "news/getNewsById",
    async ({id}) => {
        try {
            const res = await getNewsId(id)
            return res
        } catch (err) {
            return err.response.data
        }
    }
);
export const addNews = createAsyncThunk(
    "news/addNews",
    async ({data, navigate, toast, setErrMsg, setErrTitleMsg, setErrSubtitleMsg, setErrImageMsg}, { rejectWithValue }) => {
        try {
            const res = await createNews(data)
            .then(()=>{
                toast.success("News Create Successfully");
                navigate('/berita');
            })
            .catch((error)=>{
                toast.error('News Create Failed')
                if(!error?.response){
                    setErrMsg('Server no response')
                }else if(error?.response?.status === 422){
                    setErrTitleMsg(error?.response?.data?.title)
                    setErrSubtitleMsg(error?.response?.data?.subtitle)
                    setErrImageMsg(error?.response?.data?.image)
                }else if(error?.response){
                    setErrMsg(error?.response?.message)
                }else{
                    setErrMsg('Gagal Disimpan')
                }
            })
            return res
        } catch(err) {
            (err)=>{
                toast.error(err.response.data);
            }
        }
    }
);
export const editNews = createAsyncThunk(
    "news/editNews",
    async ({id, data, navigate, toast, setErrMsg, setErrTitleMsg, setErrSubtitleMsg, setErrImageMsg}, { rejectWithValue }) => {
        try {
            const res = await updateNews(id,data)
            .then(()=>{
                toast.success("News Updated Successfully");
                navigate('/berita');
            })
            .catch((error)=>{
                toast.error('News Updated Failed')
                if(!error?.response){
                    setErrMsg('Server no response')
                }else if(error?.response?.status === 422){
                    setErrTitleMsg(error?.response?.data?.title)
                    setErrSubtitleMsg(error?.response?.data?.subtitle)
                    setErrImageMsg(error?.response?.data?.image)
                }else if(error?.response){
                    setErrMsg(error?.response?.message)
                }else{
                    setErrMsg('Gagal Disimpan')
                }
            }
            )
            return res
        } catch(err) {
            (err)=>{
                toast.error(err.response.data);
            }
        }
    }
);
export const delNews = createAsyncThunk(
    "news/delNews",
    async ({id, navigate, toast }, { rejectWithValue }) => {
        try {
            const res = await deleteNews(id).then(()=>{
                toast.success("Delete Successfully");
                navigate('/berita');
            }).catch(()=>{
                toast.error('Delete Failed')
            })
            return res
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
// export const getNewsById = createAsyncThunk(
//     "news/getNewsById",
//     async (newsId, { rejectWithValue }) => {
//         try {
//             const response = await api.get(`/v1/news/${newsId}`);;
//             return response.data;
//         } catch (err) {
//             return rejectWithValue(err.response.data);
//         }
//     }
// );
// export const updateNews = createAsyncThunk(
//     "news/updateNews",
//     async ({ id, updatedNewsData, toast, navigate }, { rejectWithValue }) => {
//         try {
//             const response = await api.post(`/v1/news/${id}`, updatedNewsData);
//             toast.success("News Updated Successfully");
//             navigate("/berita");
//             return response.data;
//         } catch (err) {
//             return rejectWithValue(err.response.data);
//         }
//     }
// );
// export const deleteNews = createAsyncThunk(
//     "news/deleteNews",
//     async ({ id, toast }, { rejectWithValue }) => {
//         try {
//             const response = await api.delete(`/v1/news/${id}`);
//             toast.success("News Deleted Successfully");
//             return response.data;
//         } catch (err) {
//             return rejectWithValue(err.response.data);
//         }
//     }
// );

const newsSlice = createSlice({
    name:'news',
    initialState: {
        news:[],
        newsId:[],
        loading:false,
        error:''
    },
    extraReducers: {
        [getAllNews.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllNews.fulfilled]: (state, action) => {
            state.loading = false
            state.news = action.payload
        },
        [getAllNews.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload?.message;
        },

        [getNewsById.pending]: (state, action) => {
            state.loading = true;
        },
        [getNewsById.fulfilled]: (state, action) => {
            state.loading = false
            state.newsId = action.payload
        },
        [getNewsById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload?.message;
        },

        [addNews.pending]: (state, action) => {
            state.loading = true;
        },
        [addNews.fulfilled]: (state, action) => {
            state.loading = false;
            state.news = action.payload;
        },
        [addNews.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload?.message;
        },

        [editNews.pending]: (state, action) => {
            state.loading = true;
        },
        [editNews.fulfilled]: (state, action) => {
            state.loading = false;
            state.news = action.payload;
        },
        [editNews.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload?.message;
        },

        [delNews.pending]: (state, action) => {
            state.loading = true;
        },
        [delNews.fulfilled]: (state, action) => {
            state.loading = false;
            state.news = action.payload;
        },
        [delNews.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload?.message;
        },

        // [getNewsById.pending]: (state, action) => {
        //     state.loading = true;
        // },
        // [getNewsById.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     state.newsId = action.payload;
        // },
        // [getNewsById.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload.message;
        // },

        // [updateNews.pending]: (state, action) => {
        //     state.loading = true;
        // },
        // [updateNews.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     const {arg: { id }} = action.meta;
        //     if (id) {
        //         state.newsId = state.newsId.map((item) =>
        //             item.id === id ? action.payload : item
        //         );
        //         state.newses = state.newses.map((item) =>
        //             item.id === id ? action.payload : item
        //         );
        //     }
        // },
        // [updateNews.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload.message;
        // },

        // [deleteNews.pending]: (state, action) => {
        //     state.loading = true;
        // },
        // [deleteNews.fulfilled]: (state, action) => {
        //     state.loading = false;
        //     const {
        //         arg: { id },
        //     } = action.meta;
        //     if (id) {
        //         state.newsId = state.newsId.filter((item) => item.id !== id);
        //         state.newses = state.newses.filter((item) => item.id !== id);
        //     }
        // },
        // [deleteNews.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload.message;
        // },
    }
})

export default newsSlice.reducer;