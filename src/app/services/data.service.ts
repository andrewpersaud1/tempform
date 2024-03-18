import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {throwError} from 'rxjs';
import { NotFoundError } from '../common/not-found-error';
import { catchError } from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { badInput } from '../common/bad-input';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private url: string, private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<any[]>(this.url)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(resource: any){
    return this.httpClient.post<any>(this.url,JSON.stringify(resource))
      .pipe(
        catchError((error: HttpErrorResponse) => {


            return throwError(()=>new AppError(error));
      })
    );
  }

  update(resource: any){
    return  this.httpClient.patch(this.url + '/'+ resource.id, JSON.stringify({isRead:true}))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(()=>new AppError(error));
        })
      );
  }

  delete(id: any){
    return this.httpClient.delete(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: Response){
    if (error.status === 400)
      return throwError(()=>new badInput(error));
    if(error.status === 404)
      return throwError(()=>new NotFoundError("Resource Not Found"));

    return throwError(()=>new AppError(error));
  }
}
