import { Component, OnInit } from '@angular/core';
import { NotFoundError, subscribeOn } from 'rxjs';
import { PostService } from '../services/post.service';
import { AppError } from '../common/app-error';
import { badInput } from '../common/bad-input';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit{
  posts: any[] = [];

  constructor(private service:PostService){

  }

  ngOnInit(): void {
    this.service.getAll()
      .subscribe(
        (response: any[]) => {
          this.posts = response;
    });


  }
    createPost(input: HTMLInputElement){
        let post: {title: string, id?:number} = {title: input.value};
        input.value= '';


        this.service.create(post)
        .subscribe(
          (response: any) =>{
            post.id = response.id;
            this.posts.unshift(post);
        },
          (error: AppError )=> {
            if (error instanceof badInput){
              // this.form.setErrors(error.originalError);
            }
             else{
                throw error;
            }
        });
    }

    update(post: {id: number, isRead?:boolean}): void{
        this.service.update(post)
          .subscribe(
            (response: any)=>{
              console.log(response);
          });
    }

    delete(postToDelete: any): void{
      this.service.delete(345)
        .subscribe(
         () =>{
            let index = this.posts.indexOf(postToDelete);
            this.posts.splice(index, 1);
        },
          (error: AppError) => {
            if(error instanceof NotFoundError)
              alert('this post has already been deleted.');
            else throw error;
        });

    }

}
