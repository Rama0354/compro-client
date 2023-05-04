import { createContext, useEffect, useState } from "react";
import { api } from "../api/axios"
import Cookies from "universal-cookie";

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    const cookie = new Cookies()
    const [currentUser, setCurrentUser] = useState(cookie.get('auth') || '')
    
    const login = async (inputs)=>{
        const res = await api.post('v1/login', inputs);
        setCurrentUser(res.data.data)
    }
    const logout = async ()=>{
        setCurrentUser('')
    }
    
    useEffect(()=>{
        cookie.set('auth',currentUser,{path:'/',expires : new Date(currentUser?.token?.expires_in)})
        if(!cookie.get('auth') || cookie.get('auth') == ''){
            setCurrentUser('')
        }
        // localStorage.setItem('user', JSON.stringify(currentUser))
        // Number.prototype.padLeft = function(base,chr){
        //     var  len = (String(base || 10).length - String(this).length)+1;
        //     return len > 0? new Array(len).join(chr || '0')+this : this;
        // }
        // var d = new Date,
        // dformat = [d.getFullYear(),
        //         (d.getMonth()+1).padLeft(),
        //         d.getDate().padLeft()].join('-') +' ' +
        //         [d.getHours().padLeft(),
        //         d.getMinutes().padLeft(),
        //         d.getSeconds().padLeft()].join(':');
        // console.log('sekarang'+ dformat + 'token' + currentUser?.token?.expires_in )
        // if(dformat >= currentUser?.token?.expires_in){
        //     setCurrentUser(null)
        // }
    },[currentUser])

    return <AuthContext.Provider value={{currentUser,login,logout}}>
        {children}
    </AuthContext.Provider>
}