import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { global } from '../../services/global';
import { Post } from '../../models/post';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [CategoryService]
})
export class CategoryDetailComponent implements OnInit {
 public page_title:string;
 public category:Category;
 public posts: Post[];
 public url: string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _categoryService:CategoryService
  ) { 
    this.url=global.url;
  }

  ngOnInit() {
this.getPostsByCategory();
  }

  getPostsByCategory(){
    this._route.params.subscribe(params=>{
      let id=params['id'];
      this._categoryService.getCategory(id).subscribe(response=>{
        if(response.status='success'){
          this.category=response.category;
          this.page_title=this.category.name;
          this._categoryService.getPostsByCategory(id).subscribe(response=>{
            if(response.status="success"){
              this.posts=response.posts;
            }else{

            }
            
          },error=>{
            console.log(error);
          })
        }else{
          this._router.navigate(['/inicio']);
        }
      },error=>{
        console.log(error);
      })
    })
  }

}
