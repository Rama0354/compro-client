import { createContext, useEffect, useState } from "react";
import { api } from "../api/axios"

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null )
    const date = new Date()
    const login = async (inputs)=>{
        const res = await api.post('v1/login', inputs);
        setCurrentUser(res.data.data)
    }
    const logout = async ()=>{
        await api.get('v1/logout',{headers: {
            Authorization : `Bearer ${JSON.parse(localStorage.getItem("user")).token.access_token}`
        }})
        setCurrentUser(null)
    }

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser))
        if(currentUser?.token?.expires_in === date){setCurrentUser(null)}
    },[currentUser])

    return <AuthContext.Provider value={{currentUser,login,logout}}>
        {children}
    </AuthContext.Provider>
}