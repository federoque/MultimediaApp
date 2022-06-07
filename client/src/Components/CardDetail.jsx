import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadingOn, getContentById, qualificate, deleteContent } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwt from 'jwt-decode'
import Swal from "sweetalert2";
import Header from "./Header";
import s from '../styles/CardDetail.module.css'


export default function CardDetail(){

    const params = useParams()
    const dispatch = useDispatch()
    const token = useSelector(state=> state.token)
    const user = useSelector(state=> state.user)
    const contentById = useSelector(state=> state.contentById)
    const loading = useSelector(state=> state.loading)
    const role = useSelector(state=> state.role)
    const accesstoken = {
        accesstoken: token
    }

    const userdecoded = jwt(token)

    const navigate = useNavigate()

    const [select, setSelect] = useState("")
   
    useEffect(()=>{
        dispatch(loadingOn())
        dispatch(getContentById(accesstoken, params.id))
    }, [dispatch])


    function handleIngresar(e){
        e.preventDefault()
        navigate('/')
    }

    function handleQualificate(e){
        e.preventDefault()
        let qual = {
            userId: userdecoded.id,
            contentId:  contentById[0].ID,
            qualification: Number(select)
        }
        dispatch(qualificate(accesstoken , qual))
        dispatch(getContentById(accesstoken, params.id))
    }
    

    function handleSelect(e){
        e.preventDefault(e)
        setSelect(e.target.value)
    }

    function handleDelete(e){
        e.preventDefault(e)
        Swal.fire({
            background: "#111",
            color:'#EEE',
            title: '¿Quieres eliminar este contenido?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteContent(accesstoken, params.id))
              Swal.fire({
                background: "#111",
                color:'#EEE',
                icon: 'success',
                title: 'Contenido eliminado con éxito!',
              })
              setTimeout(() => {
                navigate('/home')
              }, 1500);
            } else if (result.isDenied) {
              Swal.fire({
                title:'¡Puedes eliminarlo más tarde!',
                background: "#111",
                color:'#EEE',
              })
            }
          })
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

   if(!contentById){
       return(
           <div>
               waiting
           </div>
       )
   }

    return(
        <div>
            {user ? <Header/> : null}
            <div className={s.container}>
            <div className={s.video}>
            <iframe src={"https://www.youtube.com/embed/" + contentById[0].URL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className={s.descripcion}>
            <h1>{contentById[0].NAME}</h1>
            <h3>Categoria</h3>
            {contentById[0].CATEGORIES.map(category=>{
                return(
                    <p key={category}>{category}</p>
                )
            })}
            <h3>Calificación: {contentById[0].QUALIFICATION}</h3>
            <div>
                <form >
                    <label>Calificar</label>
                    <select onChange={handleSelect}>
                        <option value= "1">1</option>
                        <option value= "2">2</option>
                        <option value= "3">3</option>
                        <option value= "4">4</option>
                        <option value= "5">5</option>
                        <option value= "6">6</option>
                        <option value= "7">7</option>
                        <option value= "8">8</option>
                        <option value= "9">9</option>
                        <option value= "10">10</option>
                    </select>
                    <button className= {s.calificar} disabled = {select==="" ? true : false} onClick={handleQualificate}>Enviar</button>
                </form>
                {role=== 'Admin' ? 
                <div>
                    <button onClick={handleDelete}>Eliminar</button>
                    <button onClick={()=>navigate('/updatecontent/'+params.id)}>Modificar</button>
                </div>
                :null}
                <button onClick={()=>navigate('/home')}>Atrás</button>
            </div>
            </div>
            </div>
        </div>
    )
}