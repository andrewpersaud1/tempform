import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PostService extends DataService{

  constructor( httpClient: HttpClient) {
    super('https://jsonplaceholder.typicode.com/posts',httpClient);
  }


}
