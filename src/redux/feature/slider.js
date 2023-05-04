import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlider, deleteSlider, getSlider, updateSlider } from "../../api/axios";

export const getAllSlider = createAsyncThunk(
    'slider/getAllSlider',
    async ()=>{
        try {
            const res = await getSlider()
            return res
        } catch (err) {
            return err.response.data
        }
    }
)
export const addSlider = createAsyncThunk(
    'slider/addSlider',
    async ({data, toast, setSt, setErrMsg, setErrTitleMsg, setErrImageMsg}, { rejectWithValue }) => {
        try {
            const res = await createSlider(data)
            .then(()=>{
                toast.success("Slider Create Successfully");
                setSt(null)
            })
            .catch((error)=>{
                toast.error('Slider Create Failed')
                if(!error?.response){
                    setErrMsg('Server no response')
                }else if(error?.response.status === 422){
                    setErrTitleMsg(error?.response?.data?.title)
                    setErrImageMsg(error?.response?.data?.image)
                }else if(error?.response){
                    setErrMsg(error?.response?.data?.message)
                }else{
                    setErrMsg('Simpan Slider Gagal')
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
export const editSlider = createAsyncThunk(
    'slider/editSlider',
    async ({id,data, toast, setSt, setErrMsg, setErrTitleMsg, setErrImageMsg}, { rejectWithValue }) => {
        try {
            const res = await updateSlider(id,data)
            .then(()=>{
                toast.success("Slider Update Successfully");
                setSt(null)
            })
            .catch((error)=>{
                toast.error('Slider Update Failed')
                if(!error?.response){
                    setErrMsg('Server no response')
                }else if(error?.response.status === 422){
                    setErrTitleMsg(error?.response?.data?.title)
                    setErrImageMsg(error?.response?.data?.image)
                }else if(error?.response){
                    setErrMsg(error?.response?.data?.message)
                }else{
                    setErrMsg('Simpan Slider Gagal')
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
export const removeSlider = createAsyncThunk(
    'slider/removeSlider',
    async ({id,toast})=>{
        try {
            const res = await deleteSlider(id)
            .then(()=>{
                toast.success("Slider Dlelete Successfully");
            })
            .catch((error)=>{
                toast.error('Slider Dlelete Failed')
                console.log(error?.response)
            })
            return res
        } catch (err) {
            return err.response.data
        }
    }
)

const sliderSlice = createSlice({
    name:'slider',
    initialState:{
        slides:[],
        loading:false,
        error:''
    },
    extraReducers: {
        [getAllSlider.pending]: (state,action)=>{
            state.loading = true
        },
        [getAllSlider.fulfilled]: (state,action)=>{
            state.loading = false
            state.slides = action.payload
        },
        [getAllSlider.rejected]: (state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        [addSlider.pending]: (state,action)=>{
            state.loading = true
        },
        [addSlider.fulfilled]: (state,action)=>{
            state.loading = false
            state.slides = action.payload
        },
        [addSlider.rejected]: (state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        [editSlider.pending]: (state,action)=>{
            state.loading = true
        },
        [editSlider.fulfilled]: (state,action)=>{
            state.loading = false
            state.slides = action.payload
        },
        [editSlider.rejected]: (state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        [removeSlider.pending]: (state,action)=>{
            state.loading = true
        },
        [removeSlider.fulfilled]: (state,action)=>{
            state.loading = false
            state.slides = action.payload
        },
        [removeSlider.rejected]: (state,action)=>{
            state.loading = false
            state.error = action.payload
        },
    }
})

export default sliderSlice.reducer