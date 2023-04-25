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
    GET_INGREDIENTS,
    DELETE_PRODUCT,
    TOEDIT_PRODUCT,
    GET_ALL_CAROUSEL,
    ADD_INGREDIENT_TYPE_CATEGORIE,
    DELETE_ELEMENT
} from "../Action-types/Action-types"

const initialState = {
    chocolates: [],
    chocolateDetail: {},
    errorMessage: "",
    users: [],
    categories: [],
    types: [],
    ingredients: [],
    editedProduct:{},
    carousel:[],
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CHOCOLATES:
            return {
                ...state,
                chocolates: action.payload,
            }
        case GET_ALL_CAROUSEL:
            return {
                ...state,
                carousel: action.payload,
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
        case DELETE_PRODUCT:
            const updatedProducts = state.chocolates.products.filter(choco => choco.id !== action.payload);
            return {
                ...state,
                chocolates: updatedProducts

            };
        case TOEDIT_PRODUCT:
            return {
                ...state,
                editedProduct: action.payload,
            }
        case ADD_INGREDIENT_TYPE_CATEGORIE:
            const property = action.payload.value
            const response = action.payload.response

            return {
                ...state,
                [property]: [...state[property], response]
            }
        case DELETE_ELEMENT:
            const prop = action.payload.property
            const id = Number(action.payload.id)

            const updatedElement = state[prop].filter(element => element.id !== id);
            return {
                ...state,
                [prop]: updatedElement
            };


        default:
            return { ...state };
    }
}

export default reducer