import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCardPopupComponent } from './new-card-popup.component';

describe('NewCardPopupComponent', () => {
  let component: NewCardPopupComponent;
  let fixture: ComponentFixture<NewCardPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCardPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
