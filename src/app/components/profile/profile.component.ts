import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { global } from 'src/app/services/global';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[PostService,UserService]
})
export class ProfileComponent implements OnInit {
  public url;
  public posts:Array<Post>;
  public user:User;
  public identity;
  public token;

    constructor(private _postService:PostService, private _userService:UserService,private _route: ActivatedRoute) { 
      this.url=global.url;
      this.identity=this._userService.getIdentity();
      this.token=this._userService.getToken();
    }
    
    ngOnInit() {
     this.getProfile();
     
    }
    getProfile(){
      this._route.params.subscribe(params=>{
        let userId=+ params['id'];
        this.getPosts(userId);
        this.getUser(userId);
      });
    }
    
getUser(userId){
this._userService.getUser(userId).subscribe(response =>{
  if(response.status='success'){
    this.user=response.user;
    console.log(this.user);
  }
},error=>{
  console.log(error);
}
);
}


  getPosts(userId){
    this._userService.getPostsByUser(userId).subscribe(
      response =>{
        if(response.status='success'){
          this.posts=response.posts;
          console.log(this.posts);
        }
      },error=>{
        console.log(error);
      }
    );
  }
  deletePost(id){
    this._postService.delete(this.token,id).subscribe(response=>{
      this.getProfile();
    },error=>{
      console.log(error);
    })
  }
  }
  
