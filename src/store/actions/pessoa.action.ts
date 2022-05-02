import { pessoaActionTypes } from "../constants"

export const PessoaActions = {
    
    LIST: (payload: any)=> {
        return { type: pessoaActionTypes.LIST, payload }
    },
    CREATE: (payload: any) => {
        return { type: pessoaActionTypes.CREATE, payload }
    },
    UPDATE: (payload: any) => {
        return { type: pessoaActionTypes.UPDATE, payload }
    },
    REMOVE: (payload: any) => {
        return { type: pessoaActionTypes.REMOVE, payload }
    },
    ERROR: (payload: any) => {
        return{ type: pessoaActionTypes.ERROR, payload }
    },
    LOAD_LIST: (payload: any) => {
        return{ type: pessoaActionTypes.LOAD_LIST, payload }
    }

}