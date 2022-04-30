export abstract class BaseResource {
    id?: number;
    criadoEm?: Date;
    atualizadoEm?: Date;
    desativadoEm?: Date | null;
  }
  
  export type ModelConstructor<T> = new (...args: any[]) => T;