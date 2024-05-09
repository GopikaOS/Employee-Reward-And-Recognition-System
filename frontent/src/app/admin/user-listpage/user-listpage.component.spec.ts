import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListpageComponent } from './user-listpage.component';

describe('UserListpageComponent', () => {
  let component: UserListpageComponent;
  let fixture: ComponentFixture<UserListpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
