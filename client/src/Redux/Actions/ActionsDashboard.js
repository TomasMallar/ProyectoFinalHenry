import { GET_INFO, HANDLE_ERROR, GET_ORDERS_INFO } from "../Action-types/Action-types"
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


export const GetOrdersInfo = () => {
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
                payload: error.response.data.error
            })
        }

    }

}

