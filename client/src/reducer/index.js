
const user = sessionStorage.getItem("user");
const token = sessionStorage.getItem("token");
const role = sessionStorage.getItem("role");

const initialState= user ? {
    user: user,
    role: role,
    token: token,
    content: [],
    loading: false,
    contentById: null
} :

{
    user: null,
    role: null,
    token: null,
    content: null,
    loading: false,
    contentById: null
}

export default function reducer(state = initialState, action) {

    if(action.type === 'SIGN_IN'){
        return{
            ...state,
            token: action.payload.token,
            user: action.payload.user,
            role: action.payload.role
        }
    }

    if(action.type === 'SIGN_UP'){
        return {
            ...state
        }
    }

    if(action.type === 'SIGN_OUT'){
        return{
            ...state,
            token: null,
            user: null,
            role: null
        }
    }

    if(action.type === 'GET_CONTENT'){
        return {
            ...state,
            content: action.payload,
            loading: false
        }
    }

    if(action.type === 'LOADING_ON'){
        return{
            ...state,
            loading: true
        }
    }

    if(action.type === 'GET_CONTENT_BY_ID'){
        return{
            ...state,
            contentById: action.payload,
            loading: false
        }
    }

    if(action.type === 'QUALIFICATION'){
        return{
            ...state
        }
    }
    
    if(action.type === 'SEARCH_CONTENT'){
        return{
            ...state,
            content: action.payload
        }
    }

    if(action.type === 'CATEGORY_CONTENT'){
        return{
            ...state,
            content: action.payload
        }
    }

    if(action.type === 'CREATE_CONTENT'){
        return{
            ...state
        }
    }

    if(action.type === 'DELETE_CONTENT'){
        return{
            ...state
        }
    }

    if(action.type === 'UPDATE_CONTENT'){
        return{
            ...state
        }
    }
    return state
}