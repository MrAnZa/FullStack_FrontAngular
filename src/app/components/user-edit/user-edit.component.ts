import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {global} from '../../services/global';
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
  public url;

  public froala_options: Object= {
    charCounterCount: true,
    language:'es',
    toolbarButtons: ['bold','italic','underline','paragraphFormat'],
    toolbarButtonsXS: ['bold','italic','underline','paragraphFormat'],
    toolbarButtonsSM: ['bold','italic','underline','paragraphFormat'],
    toolbarButtonsMD: ['bold','italic','underline','paragraphFormat'],
  };

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "1",
    uploadAPI:  {
      url: global.url+'user/upload',
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
    this.url=global.url;
  }

  ngOnInit() {
  }
  onSubmit(form){
    this._userService.update(this.token,this.user).subscribe(
      response => {
        console.log(response);
        if(response && response.status){
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
          this.identity=response.changes;
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
  avatarUpload(datos){
  let data=JSON.parse(datos.response);
  this.user.image=data.image;
  
  }
}
