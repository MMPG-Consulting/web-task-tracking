import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-modify-card',
  templateUrl: './modify-card.component.html',
  styleUrls: ['./modify-card.component.scss']
})
export class ModifyCardComponent implements OnInit {

  // input
  @Input() card;
  @Input() currency;
  @Output() confirmChanges: EventEmitter<any> = new EventEmitter<any>();

  // form controls
  public title: FormControl = new FormControl('', [Validators.required]);
  public notes: FormControl = new FormControl('');
  public value: FormControl = new FormControl('');

  constructor(
    private fireStore: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) { }

  // confirm card modification
  public createCard(status: boolean) {

    if (status) {

      // rteurn if invalid
      if (this.title.invalid) {
        return;
      }

      // build the data object
      this.card.card.title = this.title.value;
      this.card.card.notes = this.notes.value;
      this.card.card.value = this.value.value;

      // close pop up with data
      this.confirmChanges.emit(this.card);
    } else {
      // return with no events
      this.confirmChanges.emit();
    }

  }

  // returns the specific error for the control
  // passed as arguments
  public getErrors(control: FormControl) {
    return control.hasError('required') ? 'This field is required' : '';
  }

  // delete the card
  public async delete() {

    const uid = await this.fireAuth.auth.currentUser.uid;

    this.fireStore.collection('users').doc(uid)
    .ref.get().then(r => {
      const userData = r.data();
      userData.columns[this.card.columnId].cards.splice(this.card.cardId, 1);
      this.fireStore.collection('users').doc(uid).update(userData);
      this.confirmChanges.emit();
    });
  }

  ngOnInit() {
    this.title.reset(this.card.card.title);
    this.value.reset(this.card.card.value);
    this.notes.reset(this.card.card.notes);
  }

}
