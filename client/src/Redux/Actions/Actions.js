import axios from "axios"

import { 
    GET_ALL_CHOCOLATES, 
    GET_CHOCOLATE_BYID, 
    GET_CHOCOLATE_BYNAME, 
    ADD_CHOCOLATE,
    RESET_STATE,
    HANDLE_ERROR,
    CREATE_USER
} from "../Action-types/Action-types"

export const getAllChocolates = () => {
    return async function(dispatch){
        const response = await axios(`http://localhost:3001/products`)
        return dispatch ({
            type: GET_ALL_CHOCOLATES,
            payload: response.data
        })
    }
}

export const getChocolatesByName = (name, type, sort, sortDirection, page) => {
    console.log(sort, sortDirection, name, "llega sort?");

    return async function(dispatch){
        try {
            const response =  await axios(`http://localhost:3001/products?name=${name||""}&type=${type||""}&orderBy=${sort||""}&orderDirection=${sortDirection||""}&page=${page}`)
    console.log("Busqueda:", `http://localhost:3001/products?name=${name||""}&type=${type||""}&orderBy=${sort||""}&orderDirection=${sortDirection||""}&page=${page}`);
            return dispatch ({
                type: GET_CHOCOLATE_BYNAME,
                payload: response.data
            })
        } catch (error) {
            return dispatch ({
                type: HANDLE_ERROR,
                payload: error.response.data.error
            })
        }
      
    }
}

export const getChocolatesById = (id) => {
    return async function(dispatch){
        try {
            const response = await axios(`http://localhost:3001/products/${id}`)
                
            return dispatch ({
                type: GET_CHOCOLATE_BYID,
                payload: response.data
            })
        } catch (error) {
            return dispatch ({
                type: HANDLE_ERROR,
                payload: error.response.data.error
            })
        }
      
    }
}

export const resetChocolateDetail = () => ({
    type: RESET_STATE,
    
})

export const addChocolate = (newChocolate) => {
    return async function (dispatch){
    try {
        const response = await axios.post(`PostLink`, newChocolate)
        return dispatch({
            type: ADD_CHOCOLATE,
            payload: response.data
        })
        }
     catch (error) {
        alert(error)}
    }
}

export const addUser = (newUser) => {
    return async function (dispatch){
    try {
        const response = await axios.post(`PostLink`, newUser)
        return dispatch({
            type: CREATE_USER,
            payload: response.data
        })
        }
     catch (error) {
        alert(error)}
    }
}