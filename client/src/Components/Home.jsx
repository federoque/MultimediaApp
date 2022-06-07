import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { getContent, loadingOn } from "../actions";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import s from '../styles/Home.module.css'


 export default function Home(){
     
    const user = useSelector(state=> state.user)
    const token = useSelector(state=> state.token)
    const content = useSelector(state=> state.content)
    const loading = useSelector(state=> state.loading)
    const role = useSelector(state=> state.role)

    const navigate = useNavigate()
    
    const accesstoken = {
        accesstoken: token
    }

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(loadingOn())
        dispatch(getContent(accesstoken))
    },[dispatch])

    function handleIngresar(e){
        e.preventDefault()
        navigate('/')
    }

    const [currentPage, setCurrentPage] = useState(1)
    const contentPerPage = 6
    const lastContent = contentPerPage * currentPage
    const firstContent = lastContent - contentPerPage
    const contentToRender = !Array.isArray(content) ? content : content.slice(firstContent, lastContent)
    const lastPage = !Array.isArray(content) ? 0 : Math.ceil(content.length/contentPerPage)

    function handlePrevious(e){
        setCurrentPage(prev=>prev-1)
    }

    function handleNext(e){
        setCurrentPage(prev=>prev+1)
    }

    function handleFirstPage(e){
        setCurrentPage(prev=>1)
    }

    function handleLastPage(e){
        setCurrentPage(prev=>lastPage)
    }

    function handleLimpiar(e){
        e.preventDefault()
        dispatch(getContent(accesstoken))
        setCurrentPage(prev=>1)
    }

    if(!user){
        return(
            <div>
                <h1>Debe Ingresar al sitio para ver el contenido</h1>
                <button onClick={handleIngresar}>Ingresar</button>     
            </div>
        )
    }
    if(loading){
        return(
            <div>
                LOAAAAAADING
            </div>
        )
    }

    return(
        <div>
            {user ? <Header/> : null}
            {role=== 'Admin' ? <button onClick={()=> navigate('/createcontent')}>Agregar Contendio</button> : null}
            <NavBar />
           
            <div className={s.paginado}>
                <button onClick={ handleFirstPage }>Primera</button>
                <button onClick={ handlePrevious } disabled={ currentPage === 1 && true }>Atrás</button>
                <span>{!Array.isArray(content) ? 0 : content.length !== 0 ? currentPage+ ' of ' + lastPage : '0 of 0'}</span>
                <button onClick={ handleNext } disabled={ currentPage === lastPage && true }>Siguiente</button>
                <button onClick={ handleLastPage }>Ultima</button>
                
            </div>
            <button className= {s.limpiarfiltros} onClick={handleLimpiar}>Sin filtros</button>
            <div className={s.contenido}>
            {!Array.isArray(content) ? <h2>No existe contenido para la búsqueda</h2> : contentToRender?.map(content=>{
                return(
                <Card ID = {content.ID} NAME = {content.NAME}  URL = {content.URL} IMG= {content.IMG} QUALIFICATION = {content.QUALIFICATION} key= {content.ID} />
                )
            })}
            </div>
        </div>
    )
}