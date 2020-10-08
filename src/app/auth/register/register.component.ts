import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { debounceTime } from 'rxjs/operators';
import { Validators, FormBuilder, FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  validEmail: Boolean = false;
  constructor(public authService: AuthService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(5)]],
      email: ['',[Validators.required, Validators.pattern('^([A-Za-z0-9_\\-\.])+\@([A-Za-z0-9_\\-\.])+\.([A-Za-z]{2,4})$')]],
      password: ['',[Validators.required, Validators.minLength(5)]],
      repassword:['',[Validators.required, Validators.minLength(5)]],
    });
    this.registerForm.controls['email'].valueChanges.pipe(debounceTime(1000)).subscribe((res)=>{
      //console.log(res);
      this.authService.checkEmail(res)
      .subscribe((res)=>{
        if(res.message == 'email exists'){
          console.log(res);
          this.validEmail = true;
        }else{
          console.log(res);
          this.validEmail = false;
        }
        
      })
    }
    );
  }

  register(user) {
    this.authService.register(user)
      .subscribe((res)=>{
        if(res.success){
          this.router.navigate(['/login']);
        }
      });
  }


}
