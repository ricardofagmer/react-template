import { pessoaActionTypes } from "../constants";


const INITIAL_STATE = { pessoas: [], isLoading: false };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case pessoaActionTypes.LOAD_LIST:
            return {
                ...state, isLoading: action.payload,                
            }
        case pessoaActionTypes.LIST:
            return {
                ...state,
                isLoading: false,
                pessoas: action.payload,
                errorMessage: null
            }
        case pessoaActionTypes.CREATE:
            return { ...state, pessoas: [...state.pessoas, action.payload] }
        case pessoaActionTypes.UPDATE:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
            }
        case pessoaActionTypes.REMOVE:
            return { ...state, pessoas: state.pessoas.filter(el => el.id !== action.payload.id) };
        default:
            return state;
    }
}

