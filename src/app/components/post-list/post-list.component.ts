import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
    @Input() posts:any;
    @Input() identity:any;
    @Input() url:string;

    @Output()
    eliminar = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  deletePost(postId){
    this.eliminar.emit(postId);
  }
}
