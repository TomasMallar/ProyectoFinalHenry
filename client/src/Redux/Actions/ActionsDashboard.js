import { GET_INFO, HANDLE_ERROR } from "../Action-types/Action-types"
import axios from "axios"

export const GetInfo = () => {
    return async function (dispatch) {
        try {

            const response = await axios('http://localhost:3001/metric/month-performance')

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