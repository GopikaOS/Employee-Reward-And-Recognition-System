import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardAllocationComponent } from './reward-allocation.component';

describe('RewardAllocationComponent', () => {
  let component: RewardAllocationComponent;
  let fixture: ComponentFixture<RewardAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardAllocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
