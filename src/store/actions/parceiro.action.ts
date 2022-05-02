
const ActionTypes = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    REMOVE: 'REMOVE',
    LIST:   'PARCEIRO/LIST',
    LOAD_LISTA: 'PARCEIRO/LOAD',
    ERROR: 'PARCEIRO/ERROR'
}

export const ParceiroActions = {
    LIST: (payload: any)=> {
        return { type: ActionTypes.LIST, payload }
    },
    CREATE: (payload: any) => {
        return { type: ActionTypes.CREATE, payload }
    },
    UPDATE: (payload: any) => {
        return { type: ActionTypes.UPDATE, payload }
    },
    REMOVE: (payload: any) => {
        return { type: ActionTypes.REMOVE, payload }
    },
    ERROR: (error: any) => {
        return{ type: ActionTypes.ERROR, error }
    },
    LOAD_LIST: (status: boolean) => {
        return { type: ActionTypes.LOAD_LISTA, status}
    }


}