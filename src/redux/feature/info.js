import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { createInfo, deleteInfo, getInfo, updateInfo } from "../../api/axios";

export const getAllInfo = createAsyncThunk(
    'info/getAllInfo',
    async ()=>{
        try {
            const res = await getInfo()
            return res
        } catch (err) {
            return err.response.data
        }
    }
)
export const addInfo = createAsyncThunk(
    'info/addInfo',
    async({data,toast,navigate,setErrMsg,setErrTitleMsg,setErrImageMsg})=>{
        try {
            const res = createInfo(data).then(()=>{
                toast.success('Info Created Successfully')
                navigate('/')
            }).catch((error)=>{
                toast.error('Info Created Failed')
                if(!error?.response){
                    setErrMsg('Server no response')
                }else if(error?.response.status === 422){
                    setErrTitleMsg(error?.response?.data?.title)
                    setErrImageMsg(error?.response?.data?.image)
                }else if(error?.response){
                    setErrMsg(error?.response?.data?.message)
                }else{
                    setErrMsg('Gagal Disimpan')
                }
            })
            return res
        } catch (error) {
            return error?.response?.data
        }
    }
)
export const editInfo = createAsyncThunk(
    'info/editInfo',
    async({id,data,toast,navigate,setErrMsg,setErrTitleMsg,setErrImageMsg})=>{
        try {
            const res = updateInfo(id,data).then(()=>{
                toast.success('Info Created Successfully')
                navigate('/')
            }).catch((error)=>{
                toast.error('Info Created Failed')
                if(!error?.response){
                    setErrMsg('Server no response')
                }else if(error?.response.status === 422){
                    setErrTitleMsg(error?.response?.data?.title)
                    setErrImageMsg(error?.response?.data?.image)
                }else if(error?.response){
                    setErrMsg(error?.response?.data?.message)
                }else{
                    setErrMsg('Gagal Disimpan')
                }
            })
            return res
        } catch (error) {
            return error?.response?.data
        }
    }
)
export const removeInfo = createAsyncThunk(
    'info/removeInfo',
    async({id,toast,init})=>{
        try {
            const res = deleteInfo(id).then(()=>{
                toast.success('Info Created Successfully')
                init()
            }).catch((error)=>{
                toast.error('Info Created Failed')
                console.log(error?.message)
            })
            return res
        } catch (error) {
            return error?.response?.data
        }
    }
)

const infoSlice = createSlice({
    name:'info',
    initialState:{
        info:[],
        loading:false,
        error:''
    },
    extraReducers:{
        [getAllInfo.pending]: (state, action)=>{
            state.loading = true
        },
        [getAllInfo.fulfilled]: (state, action)=>{
            state.loading = false
            state.info = action.payload
        },
        [getAllInfo.rejected]: (state, action)=>{
            state.loading = false
            state.error = action.payload?.message
        },
        [addInfo.pending]: (state, action)=>{
            state.loading = true
        },
        [addInfo.fulfilled]: (state, action)=>{
            state.loading = false
            state.info = action.payload
        },
        [addInfo.rejected]: (state, action)=>{
            state.loading = false
            state.error = action.payload?.message
        },
        [editInfo.pending]: (state, action)=>{
            state.loading = true
        },
        [editInfo.fulfilled]: (state, action)=>{
            state.loading = false
            state.info = action.payload
        },
        [editInfo.rejected]: (state, action)=>{
            state.loading = false
            state.error = action.payload?.message
        },
        [removeInfo.pending]: (state, action)=>{
            state.loading = true
        },
        [removeInfo.fulfilled]: (state, action)=>{
            state.loading = false
            state.info = action.payload
        },
        [removeInfo.rejected]: (state, action)=>{
            state.loading = false
            state.error = action.payload?.message
        },
    }
})

export default infoSlice.reducer