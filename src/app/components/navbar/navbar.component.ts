import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // currency control
  public currency: FormControl = new FormControl('');

  // list of all currencies
  public currencies: string[] = [];

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router,
    private http: HttpClient
  ) { }

  // log off the platform
  public loggOff() {
    this.fireAuth.auth.signOut()
    .then(() => this.router.navigate(['']))
    .catch(err => console.error(err));
  }

  // get currencies from API link
  private getCurrencies() {
    this.http.get(environment.currencyLink).subscribe((res: any) => {
      res.forEach( country => {
        for (const currency of country.currencies) {
          this.currencies.push(currency.code);
        }
      });
      this.currencies.sort();
      this.currencies = [...new Set(this.currencies)];
    });
  }

  // update the user with the new currency
  public updateUser() {
    this.fireStore.collection('users').doc(this.fireAuth.auth.currentUser.uid).update({currency: this.currency.value});
  }

  ngOnInit() {
    this.getCurrencies();
  }

}
