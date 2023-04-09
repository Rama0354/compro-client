import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from '../style'
import useAuth from '../hooks/useAuth'

function LoginPage({setting}) {
    const errRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const [errMsg,setErrMsg] = useState('')
    const [errEmail,setErrEmail] = useState('')
    const [errPassword,setErrPassword] = useState('')
    const navigate = useNavigate()
    const [inputs,setInputs] = useState({
        email:'',
        password:''
    })

    useEffect(()=>{
        emailRef.current.focus()
        passwordRef.current.focus()
    },[])
    useEffect(()=>{
        setErrMsg('')
        setErrEmail('')
        setErrPassword('')
    },[inputs.email,inputs.password])

    const { login } = useAuth()

    const handleChange = (e)=>{
        setInputs((prev)=>({...prev, [e.target.name] : e.target.value }))
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            login(inputs).then(()=>navigate('/')).catch((error)=>{
                if(!error?.response){
                    setErrMsg('Server no response')
                }else if(error?.response.status === 422){
                    setErrEmail(error?.response?.data?.email)
                    setErrPassword(error?.response?.data?.password)
                }else if(error?.response){
                    setErrMsg(error?.response?.data?.message)
                }else{
                    setErrMsg('login gagal')
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-full h-full min-h-screen bg-slate-200 flex justify-center items-center'>
            <div className='w-[400px] h-max bg-white flex flex-col'>
                <div className='w-full p-3 border-b border-slate-200'>
                    <h1 className={`${styles.heading1} text-center`}><Link to={'/'}>{setting.name}</Link></h1>
                    <h2 className='font-bold font-poppins text-xl text-slate-600 text-center'>Login</h2>
                </div>
                <form className='w-full flex flex-col gap-6 p-6 justify-center'>
                    <p ref={errRef} className={errMsg ? "font-poppins text-rose-600 text-sm" : "hidden"} aria-live='assertive'>{errMsg}</p>
                    <div className='py-1 px-3'>
                        <input 
                        placeholder='E-Mail' 
                        autoComplete='off' 
                        type="text" 
                        name='email' 
                        ref={emailRef}
                        onChange={handleChange}
                        className='p-3 w-full border border-slate-200 rounded-lg bg-slate-100 text-slate-600 font-poppins leading-3 outline-none' 
                        required/>
                        <p ref={errRef} className={errEmail ? "font-poppins text-rose-600 text-sm" : "hidden"} aria-live='assertive'>{errEmail}</p>
                    </div>
                    <div className='py-1 px-3'>
                        <input 
                        placeholder='Password' 
                        type="password" 
                        name='password' 
                        ref={passwordRef}
                        onChange={handleChange} 
                        className='p-3 w-full border border-slate-200 rounded-lg bg-slate-100 text-slate-600 font-poppins leading-3 outline-none' 
                        required/>
                        <p ref={errRef} className={errPassword ? "font-poppins text-rose-600 text-sm" : "hidden"} aria-live='assertive'>{errPassword}</p>
                    </div>
                    <button onClick={handleSubmit} className='p-3 rounded-lg bg-gradient-to-br from-lime-500 to-green-600 text-white text-md font-poppins font-bold'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage