import { BaseResourceService } from "../core/base-resource-service";
import { Parceiro } from "../model/parceiro.entity";
export class ParceiroService extends BaseResourceService<Parceiro> {
    protected resourceEndpoint = 'parceiro';
}
