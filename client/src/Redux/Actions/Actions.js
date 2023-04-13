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
        const response = await axios(`backendlink`)
        return dispatch ({
            type: GET_ALL_CHOCOLATES,
            payload: response.data
        })
    }
}

export const getChocolatesByName = (name, Filter, sort, page) => {
    return async function(dispatch){
        try {
            const response =  await axios(`backendlink?name=${name||""}&Filter=${Filter||""}&sort=${sort||""}&page=${page}`)
    
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

export const getVideogamesById = (id) => {
    return async function(dispatch){
        try {
            const response = await axios(`backendlink/${id}`)
                
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