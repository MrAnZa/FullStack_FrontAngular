import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UserService]
})
export class RegistroComponent implements OnInit {
  public page_title: string;
  public user: User;
  constructor(private _userService: UserService) { 
    this.page_title='Registrate';
    this.user= new User(1,'','','ROLE_USER','','','','');
 }

  ngOnInit() {
  }
  onSubmit(form){
    console.log(this.user);
    console.log(this._userService.test());
  form.reset();
  }

}
