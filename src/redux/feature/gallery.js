import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createGallery, getGallery, updateGallery, deleteGallery } from "../../api/axios";

export const getAllGallery = createAsyncThunk(
    'galler/getAllGallery',
    async()=>{
        try {
            const res = await getGallery()
            return res
        } catch (err) {
            return err.response.message
        }
    }
)
export const addGallery = createAsyncThunk(
    'gallery/addGallery',
    async ({data, toast, setSt, setErrMsg, setErrTitleMsg, setErrImageMsg}, { rejectWithValue }) => {
        try {
            const res = await createGallery(data)
            .then(()=>{
                toast.success("Gallery Create Successfully");
                setSt(null)
            })
            .catch((error)=>{
                toast.error('Gallery Create Failed')
                if(!error?.response){
                    setErrMsg('Server no response')
                }else if(error?.response.status === 422){
                    setErrTitleMsg(error?.response?.data?.title)
                    setErrImageMsg(error?.response?.data?.image)
                }else if(error?.response){
                    setErrMsg(error?.response?.data?.message)
                }else{
                    setErrMsg('Simpan Gallery Gagal')
                }
            })
            return res
        } catch(err) {
            (err)=>{
                rejectWithValue(err?.response?.data)
                toast.error(err.response.data);
            }
        }
    }
)
export const editGallery = createAsyncThunk(
    'gallery/editGallery',
    async ({id,data, toast, setSt, setErrMsg, setErrTitleMsg, setErrImageMsg}, { rejectWithValue }) => {
        try {
            const res = await updateGallery(id,data)
            .then(()=>{
                toast.success("Gallery Update Successfully");
                setSt(null)
            })
            .catch((error)=>{
                toast.error('Gallery Update Failed')
                if(!error?.response){
                    setErrMsg('Server no response')
                }else if(error?.response.status === 422){
                    setErrTitleMsg(error?.response?.data?.title)
                    setErrImageMsg(error?.response?.data?.image)
                }else if(error?.response){
                    setErrMsg(error?.response?.data?.message)
                }else{
                    setErrMsg('Simpan Gallery Gagal')
                }
            })
            return res
        } catch(err) {
            (err)=>{
                rejectWithValue(err?.response?.data)
                toast.error(err.response.data);
            }
        }
    }
)
export const removeGallery = createAsyncThunk(
    'galler/removeGallery',
    async({id,toast,init})=>{
        try {
            const res = await deleteGallery(id)
            .then(()=>{
                toast.success("Gallery Deleted Successfully");
                init()
            })
            .catch((error)=>{
                toast.error('Gallery Delete Failed')
                console.log(error)
            })
            return res
        } catch (err) {
            return err.response.message
        }
    }
)

const gallerySlice = createSlice({
    name:'gallery',
    initialState:{
        image:[],
        loading:false,
        error:''
    },
    extraReducers: {
        [getAllGallery.pending]: (state,action)=>{
            state.loading = true
        },
        [getAllGallery.fulfilled]: (state,action)=>{
            state.loading = false
            state.image = action.payload
        },
        [getAllGallery.rejected]: (state,action)=>{
            state.loading = false
            state.error = action.payload.message
        },
        [addGallery.pending]: (state,action)=>{
            state.loading = true
        },
        [addGallery.fulfilled]: (state,action)=>{
            state.loading = false
            state.image = action.payload
        },
        [addGallery.rejected]: (state,action)=>{
            state.loading = false
            state.error = action.payload.message
        },
        [editGallery.pending]: (state,action)=>{
            state.loading = true
        },
        [editGallery.fulfilled]: (state,action)=>{
            state.loading = false
            state.image = action.payload
        },
        [editGallery.rejected]: (state,action)=>{
            state.loading = false
            state.error = action.payload.message
        },
        [removeGallery.pending]: (state,action)=>{
            state.loading = true
        },
        [removeGallery.fulfilled]: (state,action)=>{
            state.loading = false
            state.image = action.payload
        },
        [removeGallery.rejected]: (state,action)=>{
            state.loading = false
            state.error = action.payload.message
        },
    }
})

export default gallerySlice.reducer