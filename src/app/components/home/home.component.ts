import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router
  ) { }

  private checkLogin() {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['']);
      }
    });
  }

  ngOnInit() {
    this.checkLogin();
  }

}
