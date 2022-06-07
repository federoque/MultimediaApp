import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logOut } from "../actions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import s from "../styles/Header.module.css"

export default function Header(){
    const user = useSelector(state=> state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogOut(e){
        Swal.fire({
            background: "#111",
            color:'#EEE',
            title: '¿Seguro quieres cerrar sesion?',
            showDenyButton: true,
            denyButtonColor: '#CF0909',
            confirmButtonText: 'Si',
            denyButtonText: `No`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              dispatch(logOut)
              navigate('/')
              window.location.reload()
            } else if (result.isDenied) {
              Swal.fire({
                title:'¡Excelente decisión!',
                background: "#111",
                color:'#EEE',
              })
            }
          })
    }

    return(
        <div className={s.container}>
            <p>Usuario: {user}</p>
            <button onClick={handleLogOut}>Cerrar Sesión</button>
        </div>
    )
}