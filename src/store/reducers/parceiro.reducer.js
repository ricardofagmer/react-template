import { parceiroActionTypes } from "../constants";


const INITIAL_STATE = { parceiros: [] };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case parceiroActionTypes.LIST:
            return {
                ...state,
                isLoading: true,
                parceiros: action.payload,
                errorMessage: null
            }
        case parceiroActionTypes.CREATE:
            return { ...state, parceiros: [...state.parceiros, action.payload] }
        case parceiroActionTypes.UPDATE:
            const parceiros = state.parceiros.map(el => el.id === action.payload.id ? action.payload : el);
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
                parceiros
            }
        case parceiroActionTypes.REMOVE:
            return { ...state, parceiros: state.parceiros.filter(el => el.id !== action.payload.id) };
        default:
            return state;
    }
}

