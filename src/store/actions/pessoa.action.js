import { PessoaActionTypes } from "../constants"


export const pessoasActions = {
    buscarPessoas: (payload) => {
        return { type: PessoaActionTypes.LISTAR, payload }
    },
    adicionarPessoas: (payload) => {
        return { type: PessoaActionTypes.ADICIONAR, payload }
    },
    atualizarPessoas: (payload) => {
        return { type: PessoaActionTypes.ATUALIZAR, payload }
    },
    removerPessoas: (payload) => {
        return { type: PessoaActionTypes.REMOVER, payload }
    }

}