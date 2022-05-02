import { Pessoa } from "../model/pessoa/pessoa.entity";
import { BaseResourceService } from "../core/base-resource-service";
export class PessoaService extends BaseResourceService<Pessoa> {
    protected resourceEndpoint = 'pessoa';
}
