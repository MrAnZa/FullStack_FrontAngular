import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public page_title: string;
  constructor() { 
    this.page_title='Registrate';
  }

  ngOnInit() {
  }

}
