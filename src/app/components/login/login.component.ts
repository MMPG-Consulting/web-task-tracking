import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    // form
    public pass = new FormControl('', [Validators.minLength(8), Validators.required]);
    public email = new FormControl('', [Validators.email, Validators.required]);

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router
  ) { }

  // get form validation errors
  public getErrors(control: FormControl) {
    return control.hasError('email') ? 'Email is badly formatted' :
      control.hasError('minlength') ? 'Password does not meet minimal length of 8' :
      control.hasError('required') ? 'This field is required' :
      '';
  }

  public login() {

    if (this.pass.invalid || this.email.invalid) {
      return;
    }

    this.fireAuth.auth.signInWithEmailAndPassword(this.email.value, this.pass.value)
    .then(() => this.router.navigate(['home']))
    .catch(err => console.error(err));
  }

  private checkLogin() {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigate(['home']);
      }
    });
  }

  public triggerChange() {
    this.router.navigate(['register']);
  }

  ngOnInit() {
    this.checkLogin();
  }

}
