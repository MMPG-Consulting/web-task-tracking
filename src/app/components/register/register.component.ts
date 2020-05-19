import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // form
  public pass = new FormControl('', [Validators.minLength(8), Validators.required]);
  public email = new FormControl('', [Validators.email, Validators.required]);

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private firesStore: AngularFirestore
  ) { }

  // get form validation errors
  public getErrors(control: FormControl) {
    return control.hasError('email') ? 'Email is badly formatted' :
      control.hasError('minlength') ? 'Password does not meet minimal length of 8' :
      control.hasError('required') ? 'This field is required' :
      '';
  }

  public triggerChange() {
    this.router.navigate(['']);
  }

  public register() {
    this.fireAuth.auth.createUserWithEmailAndPassword(this.email.value, this.pass.value)
    .then(() => {
      this.fireAuth.auth.signInWithEmailAndPassword(this.email.value, this.pass.value)
      .then(r => {
        this.firesStore.collection('users').doc(r.user.uid).set({columns: []});
        this.router.navigate(['']);
      })
      .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
  }

  private checkLogin() {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigate(['home']);
      }
    });
  }

  ngOnInit() {
    this.checkLogin();
  }

}
