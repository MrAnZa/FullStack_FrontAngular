import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Post } from '../../models/post';
import {global} from '../../services/global';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService,CategoryService,PostService]
})
export class PostNewComponent implements OnInit {
public page_title:string;
public identity;
public token;
public post:Post;
public categories;

public froala_options: Object= {
  charCounterCount: true,
  toolbarButtons: ['bold','italic','underline','paragraphFormat','alert'],
  toolbarButtonsXS: ['bold','italic','underline','paragraphFormat','alert'],
  toolbarButtonsSM: ['bold','italic','underline','paragraphFormat','alert'],
  toolbarButtonsMD: ['bold','italic','underline','paragraphFormat','alert'],
};

public afuConfig = {
  multiple: false,
  formatsAllowed: ".jpg,.png,.gif,.jpeg",
  maxSize: "1",
  uploadAPI:  {
    url: global.url+'post/upload',
    headers: {
   "Authorization" : this._userService.getToken()
    }
  },
  theme: 'attachPin',
  hideProgressBar: false,
  hideResetBtn: true,
  hideSelectBtn: false,
  attachPinText: 'Sube tu Avatar de usuario'
};

  constructor(
    private _route:ActivatedRoute,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService:PostService
  ) { this.page_title="Crear una Entrada"
this.identity=this._userService.getIdentity();
this.token=this._userService.getToken();
}

  ngOnInit() {
    this.getCategories(); 
    this.post=new Post(1,this.identity.sub,1,'', '',null,null);
    //console.log(this.post);
    
    console.log(this._postService.pruebas());
  }

getCategories(){
  this._categoryService.getCategories().subscribe(
    response=>{
      if(response.status='success'){
        this.categories=response.categories;
      }
    },
    error => {

    }
  )
}

imageUpload(data){
  let imageData=JSON.parse(data.response);
  this.post.image=imageData.image;

  }

  onSubmit(form){
    console.log(this.post);
  }
}
