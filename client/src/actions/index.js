import axios from 'axios';
import Swal from 'sweetalert2'

export function signIn(inputUser) {
    return async function(dispatch){
        try {
            let user = await axios.post('http://localhost:3001/auth/signin', inputUser)
            dispatch({
                type: 'SIGN_IN',
                payload: user.data         
            })
            Swal.fire({
                background: "#111",
                color: "#EEE",
                title: 'Bienvenido!',
                showConfirmButton: false,
                timer: 1500
              })
            sessionStorage.setItem('user', user.data.user)
            sessionStorage.setItem('token', user.data.token)
            sessionStorage.setItem('role', user.data.role)
            console.log(sessionStorage)
        } catch (error) {
            Swal.fire({
                background: "#111",
                color:'#EEE',
                icon: 'error',
                title: 'Algo salió mal',
                text: 'Usuario o Contraseña incorrectos!',
              })
        }
      
    }
}

export function signUp(inputUser) {
    return async function(dispatch){
        try {
            let user = await axios.post('http://localhost:3001/auth/signup', inputUser)
            dispatch({
                type: 'SIGN_UP',
                payload: user.data         
            })
            Swal.fire({
                background: "#111",
                color:'#EEE',
                icon: 'success',
                title: 'Registrado con exito- Por favor ingrese sus datos y presione Ingresar!',
                showConfirmButton: true,
              })
        } catch (error) {
            Swal.fire({
                background: "#111",
                color:'#EEE',
                icon: 'error',
                title: 'Algo salió mal',
                text: 'Nombre de usuario en uso: Por favor ingrese uno distinto!',
              })
        }
    }
}

export function logOut(){
    sessionStorage.clear()
    return{
        type: 'SIGN_OUT'
    }  
}

export function getContent(token) {
    return async function(dispatch){
        let allContent = await axios.get('http://localhost:3001/content', {headers: token})
        dispatch({
            type: 'GET_CONTENT',
            payload: allContent.data
        })
    }
}

export function loadingOn(){
    return{
        type: 'LOADING_ON'
    }
}

export function getContentById(token, id){
    return async function(dispatch){
        let content = await axios.get('http://localhost:3001/content/'+id, {headers: token})
        dispatch({
            type: 'GET_CONTENT_BY_ID',
            payload: content.data
        })
    }
}

export function qualificate(token, qualification){
    return async function(dispatch){
        try {
            await axios.post('http://localhost:3001/qualification', qualification, {headers: token})
            dispatch({
                type: 'QUALIFICATION'
            })
            Swal.fire({
                background: "#111",
                color:'#EEE',
                icon: 'success',
                title: 'Calificado con éxito!',
                showConfirmButton: true,
              })
        } catch (error) {
            Swal.fire({
                background: "#111",
                color:'#EEE',
                icon: 'error',
                title: 'Ya has calificado este contenido!'
              })
        }
       
    }
}

export function searchBar(token, searchbar){
    return async function (dispatch){
        const search = await axios.get('http://localhost:3001/content?search='+searchbar, {headers: token})
        dispatch({
            type: 'SEARCH_CONTENT',
            payload: search.data
        })
    } 
}

export function category(token, categorySelect){
    return async function (dispatch){
        const category = await axios.get('http://localhost:3001/content?category='+categorySelect, {headers: token})
        dispatch({
            type: 'CATEGORY_CONTENT',
            payload: category.data
        })
    }
}

export function createContent(token, newContent){
    return async function(dispatch){
        try {
            await axios.post('http://localhost:3001/content', newContent, {headers: token})
            dispatch({
                type: 'CREATE_CONTENT'
            })
            Swal.fire({
                background: "#111",
                color:'#EEE',
                icon: 'success',
                title: 'Contenido Agregado con éxito!',
                showConfirmButton: true,
              })
        } catch (error) {
            Swal.fire({
                background: "#111",
                color:'#EEE',
                icon: 'error',
                title: 'Ups! ¡Algo salió mal!'
              })
        }
    }
}

export function deleteContent(token, id){
    return async function(dispatch){
        await axios.delete('http://localhost:3001/content/'+id, {headers: token})
        dispatch({
            type: 'DELETE_CONTENT'
        })
    }
}

export function updateContent(token, newContent, id){
    return async function(dispatch){
        try {
            await axios.patch('http://localhost:3001/content/'+id, newContent, {headers: token})
            dispatch({
                type: 'UPDATE_CONTENT'
            })
            Swal.fire({
                background: "#111",
                color:'#EEE',
                icon: 'success',
                title: 'Contenido Modificado con éxito!',
                showConfirmButton: true,
              })
        } catch (error) {
            Swal.fire({
                background: "#111",
                color:'#EEE',
                icon: 'error',
                title: 'Ups! ¡Algo salió mal!'
              })
        }
    }
}
