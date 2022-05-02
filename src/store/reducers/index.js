import { combineReducers } from 'redux';
import parceiroiReducer from './parceiro.reducer';
import PessoaReducer from './pessoa.reducer';


const reducers = combineReducers({
    pessoa: PessoaReducer,
    parceiro: parceiroiReducer
});

export { reducers };