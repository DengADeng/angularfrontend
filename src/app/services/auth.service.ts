import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject, Subject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";
import Cookie from "js-cookie";
import {Md5} from "ts-md5/dist/md5";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = `${environment.API_URL}`;
  private cartItems = Cookie.getJSON("cartItems") || [];
  public userInfo = JSON.stringify(Cookie.getJSON("userInfo")) || null;
  public userInfoName;
  //记录当前登录状态
  public loggedIn =false;

  constructor(private http: HttpClient, private  router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;}
   }

  login(user): Observable<any>{
    let params = {
      "email" : user.email,
      "password": Md5.hashStr(user.password).toString()
    }
    return this.http.post(this.API_URL + 'api/users/signin', params, {withCredentials: true})
      .pipe(tap((res) => {
        if(res._id){
          //console.log(res);
          this.loggedIn= true;
          localStorage.setItem('userInfo', JSON.stringify(res));
          this.userInfo = localStorage.getItem('userInfo');
          this.userInfoName = JSON.parse(this.userInfo).name;
          this.router.navigate(['home']);
        }else{
          this.loggedIn= false;
        }
        
        //Cookie.set('userInfo', JSON.stringify(res));
        
        return res;
      }));
  }

  checklogin(): any{
    const userInfo = localStorage.getItem('userInfo');
    if(userInfo){
      this.loggedIn=true;
      //return userInfo;
      console.log(this.loggedIn);
    }else{
      this.loggedIn= false;
    }
  }

  logout(): void{
    localStorage.removeItem('userInfo');
    this.loggedIn= false;
  }

  register(user): Observable<any>{
    const encryUser = {
      'name': user.name,
      'password': Md5.hashStr(user.password).toString(),
      'email': user.email
    }
    return this.http.post(this.API_URL + 'api/users/register', encryUser)
      .pipe(tap(res => {
        if (res._id){
          this.router.navigate(['/login']);
        }
      }));
  }

  checkEmail(userEmail): Observable<any>{
    return this.http.get(this.API_URL+ 'api/users/checkEmail/' + userEmail)
      .pipe(tap(res =>{
        if(res == "valid email"){
          return '有效的邮箱';
        }else if(res == "email exists"){
          return '邮箱已注册';
        }
      }))
  }

}
