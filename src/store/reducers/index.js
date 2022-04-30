import { combineReducers } from 'redux';
import PessoaReducer from './pessoa.reducer';


const reducers = combineReducers({
    pessoa: PessoaReducer,
});

export { reducers };