import { PessoaActionTypes } from "../constants";


const INITIAL_STATE = {
    pessoas: [{ nome: 'Ricardo', id: 9, sobrenome: 'Fagmer'}]
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case PessoaActionTypes.LISTAR:
            return { ...state, pessoas: action.payload }
        case PessoaActionTypes.ADICIONAR:
            return { ...state, pessoas: [...state.pessoas, action.payload] }
        case PessoaActionTypes.ATUALIZAR:
            const pessoas = state.pessoas.map(el => el.id === action.payload.id ? action.payload : el);
            return { ...state, pessoas}
        case PessoaActionTypes.REMOVER:
            return { ...state, pessoas: state.pessoas.filter(el => el.id !== action.payload.id) };
        default:
            return state;
    }
}

