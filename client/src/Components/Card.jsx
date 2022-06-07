import React from "react";
import { NavLink } from "react-router-dom";
import s from '../styles/Card.module.css'

export default function Card({ID, NAME, IMG, QUALIFICATION, URL}){
    return (
   
            <div className={s.card}>
            <NavLink  to= {'/content/'+ ID}>    
                <h2>{NAME}</h2>
                <img src={IMG} alt='IMAGEN CONTENIDO' />
            </NavLink>
            </div>

    )
}