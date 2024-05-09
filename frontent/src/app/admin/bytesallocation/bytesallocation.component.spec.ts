import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BytesallocationComponent } from './bytesallocation.component';

describe('BytesallocationComponent', () => {
  let component: BytesallocationComponent;
  let fixture: ComponentFixture<BytesallocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BytesallocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BytesallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
