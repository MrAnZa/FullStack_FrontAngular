import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status:string;

  constructor(
    private _userService: UserService
  ) { 
    this.page_title="Ajustes de Usuario";
    this.user= new User(1,'','','ROLE_USER','','','','');
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.user=this.identity;
    this.user= new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,'',
      this.identity.description,
      this.identity.image);
  }

  ngOnInit() {
  }
  onSubmit(form){
    this._userService.update(this.token,this.user).subscribe(
      response => {
        console.log(response);
        if(response){
          this.status='success';
          if(response.changes.name){
            this.user.name=response.changes.name;
          }
          if(response.changes.surname){
            this.user.surname=response.changes.surname;
          }
          if(response.changes.email){
            this.user.email=response.changes.email;
          }
          if(response.changes.description){
            this.user.description=response.changes.description;
          }
          if(response.changes.image){
            this.user.image=response.changes.image;
          }
          //Sesion
          this.identity=response.user;
          //Local
          localStorage.setItem('identity',JSON.stringify(this.identity));
        }else{
          this.status='error';
        }

      },
      error => {
        this.status='error';
        console.log(<any>error);
      }
    )

  }

}
