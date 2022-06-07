import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createContent } from "../actions";
import { useNavigate } from "react-router-dom";
import Header from './Header'
import s from '../styles/CreateContent.module.css'

export default function CreateContent(){

    const [input, setInput] = useState({
        name: "",
        url:"",
        img:"",
        categories: []
    })
    
    const categories = [
        'Accion',
        'Comedia',
        'Drama',
        'Fantasia',
        'Misterio',
        'Romance',
        'Terror',
        'Thriller',
        'Western'
    ]

    const token = useSelector(state=> state.token)
    const role = useSelector(state=> state.role)
    const user = useSelector(state=> state.user)
    const dispatch = useDispatch()
    const accesstoken = {
        accesstoken: token
    }
    const navigate = useNavigate()

    function handleInputChange(e){
        e.preventDefault()
        setInput(prev=>{
            return{
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    function handleSelect(e){
        e.preventDefault()
        if(input.categories.includes(e.target.value)) return
        setInput(prev=>{
            return{
                ...prev,
                categories: prev.categories.concat(e.target.value)
            }
        })
    }

    function handleDelete(e){
        e.preventDefault()
        setInput(prev=>{
            return{
                ...prev,
                categories: prev.categories.filter(el=> el !== e.target.value)
            }
          })
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(createContent(accesstoken, {name: input.name, url: input.url, img: input.img, categories: input.categories}))
        setInput(prev=>{
            return{
                name: "",
                url:"",
                img:"",
                categories: []
            }
        })
    }

    if(!user || role!== 'Admin'){
        return(
            <div>
                <h1>Debe Ingresar al sitio como Admin crear contenido</h1>    
            </div>
        )
    }

    if(role === 'Admin'){
    return(
        <div>
            {user ? <Header/> : null}
            <h1>Agregar contenido</h1>
            <form className={s.form}>
                <label>Nombre</label>
                <input type="text" onChange={handleInputChange} name = "name" value={input.name}/>
                <label>URL/extensión</label>
                <input type="text" onChange={handleInputChange} name = "url" value={input.url}/>
                <label>URL Imagen</label>
                <input type="text" onChange={handleInputChange} name = "img" value={input.img}/>
                <label>Categorias</label>
                <select onChange={handleSelect}>
                    {categories.map(category=>{
                        return(
                            <option value={category} key={category} >{category}</option>
                        )
                    })}
                </select>
                <div>
                        {input.categories.map(el=>{
                            return(
                                <div key={el}>
                                <span >{el}</span>
                                <button className= {s.deletecategoria}value={el} onClick={handleDelete}>x</button>
                                </div>
                            )
                        })}
                </div>
                <button onClick={handleSubmit} disabled = {(input.name=== "" || input.url==="" || input.img=== "" || input.categories.length===0) ? true : false}>Agregar Contenido</button>
            </form>
            <button onClick={()=> navigate('/home')}>Atras</button>
        </div>
    )
}
}