import { environment } from "../../environment/environment";
import Axios, { AxiosObservable } from 'axios-observable';
import { Pessoa } from "./pessoa.entity";
import { catchError, of } from "rxjs";

export default class PessoaService {

    api = environment.api + 'pessoa';

    getPessoa(): AxiosObservable<any[]> {
        return Axios.get(this.api)
                    .pipe()
    }


}
