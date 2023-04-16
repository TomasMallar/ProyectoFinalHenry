import axios from "axios"

import { 
    GET_ALL_CHOCOLATES, 
    GET_CHOCOLATE_BYID, 
    GET_CHOCOLATE_BYNAME, 
    ADD_CHOCOLATE,
    RESET_STATE,
    HANDLE_ERROR,
    CREATE_USER,
    GET_CATEGORIES,
    GET_TYPES,
    GET_INGREDIENTS
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

export const getChocolatesByName = (name, category, type, sort, sortDirection, page) => {
    return async function(dispatch){
        try {
            const response =  await axios(`http://localhost:3001/products/advanced-search?name=${name||""}&category=${category||""}&type=${type||""}&orderBy=${sort||""}&orderDirection=${sortDirection||""}&page=${page||1}`)
            console.log("Busqueda:", `http://localhost:3001/products/advanced-search?name=${name||""}&category=${category||""}&type=${type||""}&orderBy=${sort||""}&orderDirection=${sortDirection||""}&page=${page||1}`);
            return dispatch ({
                type: GET_CHOCOLATE_BYNAME,
                payload: response.data.products
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
        const response = await axios.post(`http://localhost:3001/products/`, newChocolate)
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

export const getProductsAdvanceController = (name,category, type, orderBy, orderDirection, page) => {
    return async function(dispatch){
        try {
            console.log("soy category", category)
            const response =  await axios(`http://localhost:3001/products/advanced-search?name=${name||""}&category=${category||""}&type=${type||""}&orderBy=${orderBy||""}&orderDirection=${orderDirection||""}&page=${page||1}`)
            console.log(`http://localhost:3001/products/advanced-search?name=${name||""}&category=${category||""}&type=${type||""}&orderBy=${orderBy||""}&orderDirection=${orderDirection||""}&page=${page||1}`)
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

export const GetAllCategories = () => {
    return async function(dispatch){
        try {
            const response = await axios(`http://localhost:3001/categories`)
                
            return dispatch ({
                type: GET_CATEGORIES,
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
export const GetAllTypes = () => {
    return async function(dispatch){
        try {
            const response = await axios(`http://localhost:3001/types`)
                
            return dispatch ({
                type: GET_TYPES,
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

export const GetAllIngredient = () => {
    return async function(dispatch){
        try {
            
            const response = await axios(`http://localhost:3001/ingredient`)
                
            return dispatch ({
                type: GET_INGREDIENTS,
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

