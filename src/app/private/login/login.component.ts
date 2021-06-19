import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import {AbstractControl, FormGroup, FormControl, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import{Router, ActivatedRoute} from '@angular/router';
import { UserService } from '../services/user.service';
import {variablesGlobales} from '../services/variablesGlobales';
import { map } from 'rxjs/operators';
import {ResponseData} from '../../common/ResponseData'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public isActive:boolean=true
  public loading:boolean
  Error=""
  admin=false
  role=""
  loginForm: FormGroup;
  constructor(private loginService: LoginService, 
              private router: Router, 
              private _activatedRoute: ActivatedRoute,
              private userService: UserService,
              public _variablesGlobales: variablesGlobales,
              private renderer: Renderer2
              )
    {
      this.loading=false
      this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
  }

  mostrarPassword(){
    this.isActive = true;
  }

  ocultarPassword(){
    this.isActive = false;
  }

  isValid(controlName){
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

    login(){
      this.loading=true
      
      
      if (this.loginForm.valid) {
          this.loginService.login(this.loginForm.value)
              .subscribe(data => {
                  
                  this.userService.setUserLoggedIn(data);
                  this.loginService.getUserName().subscribe((response:ResponseData) => {
                        
                        //localStorage.setItem('username', response.username);
                        localStorage.setItem('role', JSON.stringify(response.role));
                        localStorage.setItem('empresa', response.empresa);
                        localStorage.setItem('sedes', JSON.stringify(response.sedes));

                        let prueba= localStorage.getItem('role')
                        let role= JSON.parse(localStorage.getItem('role'))
                      
                      //JSON.parse(roleArray);
                    
                      

                      if (role[0] == "admin") {
                          this.router.navigate(['/private/sedes']);
                          
                      }else{
                          this.router.navigate(['/private/dashboard']);
                          localStorage.setItem('sede', JSON.stringify(response.sedes[0]));
                      }
                      
                  });
                  
              },
                  error => {this.loading=false; console.log(error.error.message)
                                this.Error = error.error.message
                          });
      }
    
    }

}






