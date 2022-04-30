import Axios, { AxiosObservable } from "axios-observable";
import { catchError, take } from "rxjs";
import { environment } from "../environment/environment";
import { BaseResource } from "./base-resource";


export abstract class BaseResourceService<T extends BaseResource>{
  protected abstract readonly resourceEndpoint: string;

  http;

  constructor() {
    this.http = Axios.create({ baseURL: environment.api })
  }

  findOne(
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

  public findAll(options?: {
    pageNumber?: number;
    pageSize?: number;
    select?: string[];
    relations?: string[];
    showDeleted?: boolean;
    query?: { [p: string]: any };
  }): AxiosObservable<T[]> {

    return this.http
      .get<T[]>(this.resourceEndpoint, { params: options })
      .pipe(
        take(1),
        catchError(err => {
          console.log(err);
          throw err;
        }));
  }

  create(resource: T): AxiosObservable<T> {
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


  update(resource: T): AxiosObservable<T> {
    return this.http.patch<T>(`${this.resourceEndpoint}/${resource.id}`, resource).pipe(
      catchError((err) => {
        console.warn(err);
        throw err;
      }),
      take(1)
    );
  }

  delete(resource: T): AxiosObservable<void> {
    return this.http.delete<void>(this.resourceEndpoint, { data: resource }).pipe(take(1));
  }

  restore(resource: T): AxiosObservable<void> {
    return this.http.post<void>(this.resourceEndpoint, resource).pipe(take(1));
  }


  softDelete(resource: T): AxiosObservable<void> {
    const requestUrl = [environment.api, this.resourceEndpoint, resource.id, 'soft'].join('/');

    return this.http.delete<void>(requestUrl).pipe(take(1));
  }



}