import {
    GET_ALL_CHOCOLATES,
    GET_CHOCOLATE_BYID,
    GET_CHOCOLATE_BYNAME,
    ADD_CHOCOLATE,
    CREATE_USER,
    RESET_STATE,
    HANDLE_ERROR,
    GET_CATEGORIES,
    GET_TYPES,
    GET_INGREDIENTS
} from "../Action-types/Action-types"

const initialState = {
    chocolates: [],
    chocolateDetail: {},
    errorMessage: "",
    users: [],
    categories: [],
    types: [],
    ingredients:[]
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CHOCOLATES:
            return {
                ...state,
                chocolates: action.payload,
            }

        case GET_CHOCOLATE_BYNAME:
            return {
                ...state,
                chocolates: action.payload,
            }

        case GET_CHOCOLATE_BYID:
            return {
                ...state,
                chocolateDetail: action.payload,
            }

        case ADD_CHOCOLATE:
            return {
                ...state,
                chocolates: { ...state, chocolates: [...state.chocolates, action.payload] },
            }

        case CREATE_USER:
            return {
                ...state,
                users: { ...state, users: [...state.users, action.payload] },
            }

        case RESET_STATE:
            return {
                ...state,
                chocolateDetail: {},
            }

        case HANDLE_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload,
            }
            case GET_INGREDIENTS:
                return {
                    ...state,
                    ingredients: action.payload,
                }

        default:
            return { ...state };
    }
}

export default reducer