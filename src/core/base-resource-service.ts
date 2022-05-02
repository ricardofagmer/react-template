import Axios, { AxiosObservable } from "axios-observable";
import { Dispatch } from "redux";
import { catchError, finalize, take } from "rxjs";
import { environment } from "../environment/environment";
import { BaseResource } from "./base-resource";

export interface ActionsResource {
  LIST: any;
  CREATE: any;
  UPDATE: any;
  REMOVE: any;
  ERROR?: any;
  LOAD_LIST?: any;
}
export interface IOptionsSelect {
  options?: {
    pageNumber?: number;
    pageSize?: number;
    select?: string[];
    relations?: string[];
    showDeleted?: boolean;
    query?: { [p: string]: any }
  }
}
export abstract class BaseResourceService<T extends BaseResource>{
  protected abstract readonly resourceEndpoint: string;

  http;

  constructor(private action: ActionsResource) {
    this.http = Axios.create({ baseURL: environment.api });
  }

  protected findOne(
    id: number,
    options?: {
      select?: string[];
      relations?: string[];
    }
  ): AxiosObservable<T | null> {
    const requestUrl = [environment.api, this.resourceEndpoint, id].join('/');
    return this.http
      .get<T>(requestUrl, { params: id })
      .pipe(
        catchError((err) => {
          console.warn(err);
          throw err
        }),
        take(1)
      );
  }

  private findAll(options?: IOptionsSelect): AxiosObservable<T[]> {
    return this.http
      .get<T[]>(this.resourceEndpoint, { params: options })
      .pipe(
        take(1),
        catchError(err => {
          console.log(err);
          throw err;
        }));
  }

  private create(resource: T): AxiosObservable<T> {
    if ('id' in resource) {
      delete resource.id;
    }

    return this.http.post<T>(this.resourceEndpoint, resource).pipe(
      catchError((err) => {
        console.warn(err);
        throw err;
      }),
      take(1)
    );
  }


  private patch(resource: T): AxiosObservable<T> {
    return this.http.patch<T>(`${this.resourceEndpoint}/${resource.id}`, resource).pipe(
      catchError((err) => {
        console.warn(err);
        throw err;
      }),
      take(1)
    );
  }

  private delete(resource: T): AxiosObservable<void> {
    return this.http.delete<void>(this.resourceEndpoint, { data: resource }).pipe(take(1));
  }

  private restore(resource: T): AxiosObservable<void> {
    return this.http.post<void>(this.resourceEndpoint, resource).pipe(take(1));
  }


  private softDelete(resource: T): AxiosObservable<void> {
    const requestUrl = [environment.api, this.resourceEndpoint, resource.id, 'soft'].join('/');

    return this.http.delete<void>(requestUrl).pipe(take(1));
  }

  list(options?: IOptionsSelect) {
    return async (dispatch: Dispatch) => {
      dispatch(this.action.LOAD_LIST(true));
      
      this.findAll(options)
        .pipe(finalize(() => dispatch(this.action.LOAD_LIST(false))))
        .subscribe((data) => dispatch(this.action.LIST(data.data)));
    }
  }

  save(pessoa: T) {
    return async (dispatch: Dispatch) => {
      await this.create(pessoa).subscribe(data => dispatch(this.action.CREATE(data)));
    }
  }

  update(pessoa: T) {
    return async (dispatch: Dispatch) => {
      await this.patch(pessoa).subscribe(data => dispatch(this.action.UPDATE(data)));
    }
  }

  remove(pessoa: T) {
    return async (dispatch: Dispatch) => {
      await this.softDelete(pessoa).subscribe(data => dispatch(this.action.REMOVE(data)));
    }
  }



}