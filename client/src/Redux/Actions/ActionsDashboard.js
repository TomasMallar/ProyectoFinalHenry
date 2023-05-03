import { GET_INFO, HANDLE_ERROR, GET_ORDERS_INFO, GET_USERS_INFO , DELETE_USER,GET_USER_INFO, GET_SALES_INFO} from "../Action-types/Action-types"
import axios from "axios"

export const GetInfo = () => {
    return async function (dispatch) {
        try {

            const response = await axios('/metric/month-performance')

            return dispatch({
                type: GET_INFO,
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


export const GetOrdersInfo = (id) => {
    return async function (dispatch) {
        try {

            const response = await axios('/metric/all-orders')
            return dispatch({
                type: GET_ORDERS_INFO,
                payload: response.data
            })
        } catch (error) {

            return dispatch({
                type: HANDLE_ERROR,
                payload: error?.response.data.error
            })
        }

    }

}


export const GetUsersInfo = () => {
    return async function (dispatch) {
        try {

            const response = await axios('/users')
            console.log(response.data);
            return dispatch({
                type: GET_USERS_INFO,
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

export const DeleteUser = (id) => {
    return async function (dispatch) {
        try {
            await axios.delete(`/users/delete/${id}`);

            return dispatch({
                type: DELETE_USER,
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


export const GetUserInfo = (id, page) => {
    console.log("id:", id, "page:", page)

    return async function (dispatch) {
        try {

            const response = await axios(`/metric/all-orders/user?userId=${id}&page=${page}`)
           console.log('response', response.data);
            return dispatch({
                type: GET_USER_INFO,
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

export const GetSalesInfo = (id) => {
    return async function (dispatch) {
        try {

            const response = await axios(`/metric/all-sales?page=${id}`)
            return dispatch({
                type: GET_SALES_INFO,
                payload: response.data
            })
        } catch (error) {
console.log("hola")
            return dispatch({
                type: HANDLE_ERROR,
                payload: error.response.data.error
            })
        }

    }

}