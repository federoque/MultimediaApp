import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { category, searchBar } from "../actions";
import s from '../styles/NavBar.module.css'

export default function NavBar(){

    const user = useSelector(state=> state.user)
    const token = useSelector(state=> state.token)
    const content = useSelector(state=>state.content)
    const accesstoken = {
        accesstoken: token
    }

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

    const [search, setSearch] = useState("")
  
    const dispatch = useDispatch()

    function handleSearchChange(e){
        e.preventDefault()
        setSearch(prev=>e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(searchBar(accesstoken, search))
       setSearch(prev=> "")
    }

  

    function handleSelect(e){
        e.preventDefault()
        dispatch(category(accesstoken, e.target.value))
    }

    if(!user){
        return(
            null
        )
    }

    return(
            <form className={s.form}>
                <input type='text' placeholder= 'Buscar...' value={search} onChange={handleSearchChange}/>
                <button type= 'submit' onClick={handleSubmit}>Buscar</button>
                <select onChange={handleSelect}>
                    {categories.map(category=>{
                        return(
                            <option value={category} key={category} >{category}</option>
                        )
                    })}
                </select>
            </form>
    )
}