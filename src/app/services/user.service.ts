import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = `${environment.API_URL}`;
  constructor(private http: HttpClient, private  router: Router) { }


  getUser(): Observable<any>{
    const user = localStorage.getItem('userInfo');
    return this.http.get(this.API_URL + 'api/users/user')
      .pipe(tap(res => {
        if (res){
          return res;
        }
      }));
  }
}
