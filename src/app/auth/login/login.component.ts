import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {LocalStorage} from "../../utils/localstore";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  response;

  constructor(public authService: AuthService,
              private router: Router,
              private LSData: LocalStorage,) { }

  ngOnInit(): void {
    this.authService.checklogin();
    if(this.authService.loggedIn){
      this.router.navigate(['/']);
    }
  }

  login(user): void{
    this.authService.login(user)
      .subscribe((res) =>{
        this.response = res;
        if (res.loggedIn){
          this.router.navigate(['/']);
        }
        location.reload();
      });
  }

}
