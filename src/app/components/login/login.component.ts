import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User
  public status: string;
  public identity;
  public token;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Identificate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit() {
    //SE EJECUTA SIEMPRE AL CARGAR EL COMPONENTE Y CIERRA SESION SOLO CUANDO LE LLEGA EL PARAMETRO sure POR LA URL
    this.logout();
  }

  onSubmit(form) {
    this._userService.signup(this.user).subscribe(
      response => {
        //TOKEN
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;
          //Objeto Identificado
          this._userService.signup(this.user,true).subscribe(
            response => {
                this.identity = response;
                
            console.log(this.token);
            console.log(this.identity);

            localStorage.setItem('token',this.token);
            localStorage.setItem('identity',JSON.stringify(this.identity));

            this._router.navigate(['inicio']);
            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          )
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }
  logout(){
    this._route.params.subscribe(params=>{
      let logout = +params['sure'];
      if(logout==1){
        localStorage.removeItem('token');
        localStorage.removeItem('identity');
        
        this.identity=null;
        this.token=null;

        this._router.navigate(['/inicio']);
      }
    });
  }

}
