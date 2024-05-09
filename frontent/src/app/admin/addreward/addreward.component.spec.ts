import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrewardComponent } from './addreward.component';

describe('AddrewardComponent', () => {
  let component: AddrewardComponent;
  let fixture: ComponentFixture<AddrewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrewardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddrewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
