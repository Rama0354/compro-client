import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSettings, updateSettings } from "../../api/axios";

export const getAllSetting = createAsyncThunk(
    'setting/getAllSetting',
    async ()=>{
        try {
            const res = await getSettings()
            return res
        } catch (err) {
            return err.response.message
        }
    }
)
export const editSetting = createAsyncThunk(
    'setting/editSetting',
    async ({data,toast,init,navigate})=>{
        try {
            const res = await updateSettings(data).then(()=>{
                toast.success('Upadate Settings Successfully')
                init()
                navigate('/')
            }).catch(error=>{
                toast.error('Update Settings Failled')
                if(!error?.response){
                    setErrMsg('Server no response')
                }else if(error?.response?.status === 422){
                    setErrNameMsg(error?.response?.data?.name)
                    setErrEmailMsg(error?.response?.data?.email)
                    setErrPhoneMsg(error?.response?.data?.phone)
                    setErrAddressMsg(error?.response?.data?.address)
                    setErrImageMsg(error?.response?.data?.image)
                    setErrLogoMsg(error?.response?.data?.logo)
                }else if(error?.response){
                    setErrMsg(error?.response?.message)
                }else{
                    setErrMsg('Gagal Disimpan')
                }
            })
            return res
        } catch (err) {
            return err?.response?.message
        }
    }
)

const settingSlice = createSlice({
    name:'setting',
    initialState:{
        setting:[],
        loading:false,
        error:''
    },
    extraReducers:{
        [getAllSetting.pending]: (state, action)=>{
            state.loading = true
        },
        [getAllSetting.fulfilled]: (state, action)=>{
            state.loading = false
            state.setting = action.payload
        },
        [getAllSetting.rejected]: (state, action)=>{
            state.loading = false
            state.error = action.payload
        },
        [editSetting.pending]: (state, action)=>{
            state.loading = true
        },
        [editSetting.fulfilled]: (state, action)=>{
            state.loading = false
            state.setting = action.payload
        },
        [editSetting.rejected]: (state, action)=>{
            state.loading = false
            state.error = action.payload
        },
    }
})

export default settingSlice.reducer