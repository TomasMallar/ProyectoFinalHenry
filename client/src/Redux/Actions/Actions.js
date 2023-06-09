import axios from "axios"

import {
    GET_ALL_CHOCOLATES,
    GET_CHOCOLATE_BYID,
    GET_CHOCOLATE_BYNAME,
    ADD_CHOCOLATE,
    RESET_STATE,
    HANDLE_ERROR,
    CREATE_USER,
    CREATE_GOOGLE_USER,
    GET_CATEGORIES,
    GET_TYPES,
    GET_INGREDIENTS,
    DELETE_PRODUCT,
    TOEDIT_PRODUCT,
    GET_ALL_CAROUSEL,
    ADD_INGREDIENT_TYPE_CATEGORIE,
    DELETE_ELEMENT,
    EDIT_PROFILE,
    GET_USER_ORDER
} from "../Action-types/Action-types"

export const getAllChocolates = () => {
    return async function (dispatch) {
        const response = await axios(`/products`)
        return dispatch({
            type: GET_ALL_CHOCOLATES,
            payload: response.data
        })
    }
}

export const getCarousel = () => {
    return async function (dispatch) {
        const response = await axios(`/products/advanced-search?name&category&type&orderBy&orderDirection&page=1&pageSize=20`)
        return dispatch({
            type: GET_ALL_CAROUSEL,
            payload: response.data
        })
    }
}

export const getChocolatesById = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios(`/products/${id}`)

            return dispatch({
                type: GET_CHOCOLATE_BYID,
                payload: response.data
            })
        } catch (error) {
            return dispatch({
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
    return async function (dispatch) {
        try {
            const response = await axios.post(`/products/`, newChocolate)
            return dispatch({
                type: ADD_CHOCOLATE,
                payload: response.data
            })
        }
        catch (error) {
            alert(error)
        }
    }
}

export const addUser = (newUser) => {
    return async function (dispatch) {
        try {
            console.log(newUser);
            const response = await axios.post(`/users/register`, newUser)
            console.log(response.data);
            return dispatch({
                type: CREATE_USER,
                payload: response.data
            })
        }
        catch (error) {
            alert(error)
        }
    }
}
export const newGoogleUser = (data) => {
    return async function (dispatch) {
        try {
            console.log(data);
            const response = await axios.post(`/auth/google`, data)
            console.log(response.data);
            return dispatch({
                type: CREATE_GOOGLE_USER,
                payload: response.data
            })
        }
        catch (error) {
            alert(error)
        }
    }
}

export const getProductsAdvanceController = (name, category, type, orderBy, orderDirection, page) => {
    return async function (dispatch) {
        try {
            const response = await axios(`/products/advanced-search?name=${name || ""}&category=${category || ""}&type=${type || ""}&orderBy=${orderBy || ""}&orderDirection=${orderDirection || ""}&page=${page || 1}`)
            // console.log(`/products/advanced-search?name=${name || ""}&category=${category || ""}&type=${type || ""}&orderBy=${orderBy || ""}&orderDirection=${orderDirection || ""}&page=${page || 1}`)
            return dispatch({
                type: GET_CHOCOLATE_BYNAME,
                payload: response.data
            })
        } catch (error) {
            return dispatch({
                type: HANDLE_ERROR,
                payload: error.response.data.error
            })
        }

    }
}

export const GetAllCategories = () => {
    return async function (dispatch) {
        try {
            const response = await axios(`/categories`)

            return dispatch({
                type: GET_CATEGORIES,
                payload: response.data
            })
        } catch (error) {
            return dispatch({
                type: HANDLE_ERROR,
                payload: error.response.data.error
            })
        }

    }

}
export const GetAllTypes = () => {
    return async function (dispatch) {
        try {
            const response = await axios(`/types`)

            return dispatch({
                type: GET_TYPES,
                payload: response.data
            })
        } catch (error) {
            return dispatch({
                type: HANDLE_ERROR,
                payload: error.response.data.error
            })
        }

    }

}

export const GetAllIngredient = () => {
    return async function (dispatch) {
        try {

            const response = await axios(`/ingredient`)

            return dispatch({
                type: GET_INGREDIENTS,
                payload: response.data
            })
        } catch (error) {

            return dispatch({
                type: HANDLE_ERROR,
                payload: error.response.data.error
            })
        }

    }

}


export const DeleteProduct = (id) => {
    return async function (dispatch) {
        try {

            await axios.put(`/products/${id}/delete`);

            return dispatch({
                type: DELETE_PRODUCT,
                payload: id
            })
        } catch (error) {
            return dispatch({
                type: HANDLE_ERROR,
                payload: error.response.data.error
            })
        }

    }

}
export const EditedProduct = (c) => {
    return function (dispatch) {
        try {
            return dispatch({
                type: TOEDIT_PRODUCT,
                payload: c
            })
        } catch (error) {
            return dispatch({
                type: HANDLE_ERROR,
                payload: error.response.data.error
            })
        }

    }

}

export const PutProduct = (finalEditedProduct) => {
    return async function (dispatch) {
        try {
            await axios.put(`/products/update/${finalEditedProduct.id}`, finalEditedProduct)

            const response = await axios(`/products/`)
            return dispatch({
                type: GET_ALL_CHOCOLATES,
                payload: response.data
            })
        }
        catch (error) {
            alert(error)
        }
    }
}



export const addIngredientCategoryType = (objToAdd, value) => {
    return async function (dispatch) {
        try {
            const res = await axios.post(`/${value}/`, objToAdd)
            
            if(value==="ingredient") {
                value="ingredients"
            }
            alert(`el elemento ${objToAdd.name} se añadió correctamente a ${value}`)
            if(value==="ingredients" || value==="types"){
            return dispatch({
                type: ADD_INGREDIENT_TYPE_CATEGORIE,
                payload: {
                    response: res.data,
                    value: value
                }
            })}else{
                return dispatch({
                    type: ADD_INGREDIENT_TYPE_CATEGORIE,
                    payload: {
                        response: res.data.newCategory,
                        value: value
                    }
                })
            }
        }
        catch (error) {
            alert(error)
        }
    }
}

export const DeleteElement = (id, value) => {
    return async function (dispatch) {
        try {

            await axios.delete(`/${value}/${id}`);
            alert(`la categoría con id: ${id} se borró de manera exitosa`)
            if(value==="ingredient") {
                value="ingredients"
            }
          
                return (dispatch({
                    type: DELETE_ELEMENT,
                    payload: {id:id,
                    property:value
                    }
                }))
        } catch (error) {
            return dispatch({
                type: HANDLE_ERROR,
                payload: error.response.data.error
            })
        }

    }

}

export const PutElement = (objChanged, id, value) => {
    return async function (dispatch) {
        try {
            await axios.put(`/${value}/${id}`, objChanged)
        
            alert(`Elemento con id: ${id} modificado correctamente!`)

            if (value === "categories") {
                const responseCat = await axios(`/${value}`)
                return (dispatch({
                    type: GET_CATEGORIES,
                    payload: responseCat.data
                }))
            }else if(value ==="ingredient"){
                const responseTypeAndIngr = await axios(`/${value}/all`)
                return (dispatch({
                    type: GET_INGREDIENTS,
                    payload: responseTypeAndIngr.data
                }))
            }else if(value ==="types"){
                const responseTypeAndIngr = await axios(`/${value}/all`)
                return (dispatch({
                    type: GET_TYPES,
                    payload: responseTypeAndIngr.data
                }))
            }

        }
        catch (error) {
            alert(error)
        }
    }
}

export const GetAllTypesWithId = () => {
    return async function (dispatch) {
        try {
            const response = await axios(`/types/all`)
            return dispatch({
                type: GET_TYPES,
                payload: response.data
            })
        } catch (error) {
            return dispatch({
                type: HANDLE_ERROR,
                payload: error.response.data.error
            })
        }

    }

}

export const GetAllIngredientWithId = () => {
    return async function (dispatch) {
        try {

            const response = await axios(`/ingredient/all`)

            return dispatch({
                type: GET_INGREDIENTS,
                payload: response.data
            })
        } catch (error) {

            return dispatch({
                type: HANDLE_ERROR,
                payload: error.response.data.error
            })
        }

    }

}

export const PutEditProfile = (id, dataEdit) => {
    return async function (dispatch) {
        try {
            
            const response = await axios.put(`/users/update/${id}`, 
            dataEdit, 
            {
            headers: {
                    Authorization: JSON.parse(localStorage.getItem("token")),
                    }
            }
            )

            return dispatch({
                type: EDIT_PROFILE,
                payload: response.data
            })
        } catch (error) {
            console.log(error);
            // return dispatch({
            //     type: HANDLE_ERROR,
            //     payload: error.response.data.error
            // })
        }
    }
}

export const getUserOrder = (id, page) => {
    return async function (dispatch) {
      try {
          const response = await axios.get(`/users/order/${id}?page=${page}`);
          
          return dispatch({
            type: GET_USER_ORDER,
            payload: response.data
          })
        } catch (error) {
          console.log(error);
        }
    }
}