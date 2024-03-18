import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  posts: any[] = [];
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private httpClient: HttpClient){
    this.httpClient.get<any[]>(this.url)
      .subscribe(response => {
          this.posts = response;
      });
  }
    createPost(input: HTMLInputElement){
        let post: {title: string, id?:number} = {title: input.value};
        input.value= '';


        this.httpClient.post<any>(this.url,JSON.stringify(post))
        .subscribe(response =>{
          post.id = response.id;
          this.posts.unshift(post);
        });
    }
    updatePost(post: {id: number, isRead?:boolean}){
      this.httpClient.patch(this.url + '/'+ post.id, JSON.stringify({isRead:true}))
        .subscribe(response=>{
          console.log(response);
        })
    }

}
