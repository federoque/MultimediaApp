import React from 'react'
import { NavLink } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {signIn, signUp} from '../actions'
import { useState } from 'react'
import Header from './Header'
import Swal from 'sweetalert2'
import s from '../styles/LandingPage.module.css'

export default function LandingPage(){
   
    const dispatch = useDispatch()
    const user = useSelector(state=> state.user)

    const [input, setInput] = useState({
        name: '',
        password: ''
    })

    function handleInputChange(e){
        e.preventDefault()
        setInput(prev=>{
            return{
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    }

    function handleSignIn(e){
        e.preventDefault()
        let inputUser = {
            name: input.name,
            password: input.password
        }
    dispatch(signIn(inputUser))
    setInput(prev=>{
            return{
                name: '',
                password: ''
            }
        })
    }

    function handleSignUp(e){
        e.preventDefault()
        Swal.fire({
            background: "#111",
            color:'#EEE',
            title: '¿Quiere registrarse?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let inputUser = {
                    name: input.name,
                    password: input.password
                }
            dispatch(signUp(inputUser))
            setInput(prev=>{
                    return{
                        name: '',
                        password: ''
                    }
                })
            } else if (result.isDenied) {
              Swal.fire({
                title:'¡Puede hacerlo más tarde!',
                background: "#111",
                color:'#EEE',
              })
            }
          })
    }

   
    return(
        <div className={s.container}>
            {user ? <Header/> : null}
            <div>
                <h1>Padawan NETFLIX</h1>
            </div>
            {!user ? 
            <form className={s.form}>
                <div className={s.ingreso}>
                    <label htmlFor="">Usuario</label>
                    <input type="text" name = 'name' onChange={handleInputChange} value = {input.name}/>
                </div>
                <div className={s.ingreso}>
                    <label htmlFor="">Password</label>
                    <input type="password" name = 'password' onChange={handleInputChange} value = {input.password}/>
                </div>
                <button type = 'submit' onClick={handleSignIn} disabled= {input.name==="" || input.password ==="" ? true : false}>Ingresar</button>
                <button type = 'submit' onClick={handleSignUp} disabled= {input.name==="" || input.password ==="" ? true : false}>Registrar</button>
            </form>
            : null}
            <NavLink to='/home' >
                {user ? <button className={s.ingresar}>Ingresar al Sitio</button> : null}
            </NavLink>
        </div>
    )
}