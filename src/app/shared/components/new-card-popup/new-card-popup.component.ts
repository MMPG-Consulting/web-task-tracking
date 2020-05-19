import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-card-popup',
  templateUrl: './new-card-popup.component.html',
  styleUrls: ['./new-card-popup.component.scss']
})
export class NewCardPopupComponent implements OnInit {

  // inputs
  @Input() id: string;

  // output events
  @Output() cardAdded: EventEmitter<any> = new EventEmitter<any>();

  // form controls used to add a new card
  public title: FormControl = new FormControl('', [Validators.required]);
  public notes: FormControl = new FormControl('');
  public value: FormControl = new FormControl('');

  constructor() { }

  // creates the card and returns the card object in the event
  public createCard() {

    // return if controls are invalid
    if (this.title.invalid || this.notes.invalid || this.value.invalid) {
      return;
    }

    // create the card object
    const card = {
      title: this.title.value,
      notes: this.notes.value,
      value: this.value.value,
      creation: new Date().getTime()
    };

    // emit the event
    this.cardAdded.emit(card);

  }

  // cancel thecard creation by emitting an empty event
  public cancelCreation() {
    this.cardAdded.emit();
  }

  // returns the specific error for the control
  // passed as arguments
  public getErrors(control: FormControl) {
    return control.hasError('required') ? 'This field is required' : '';
  }

  ngOnInit() { }

}
