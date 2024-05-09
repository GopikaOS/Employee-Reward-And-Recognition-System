import { LocalStorageService } from './../../Services/local-storage.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeloginComponent } from './homelogin.component';
import { EmployeService } from 'src/app/Services/employe.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeloginComponent', () => {
// Creating variable
  let component: HomeloginComponent;
  let fixture: ComponentFixture<HomeloginComponent>;
  let employeService:jasmine.SpyObj<EmployeService>;
  let router:jasmine.SpyObj<Router>;
  let localStorageService:jasmine.SpyObj<LocalStorageService>;
  let snackbar :jasmine.SpyObj<MatSnackBar>;

  // let beforeEachCallBack = async () => {
    // creating spyobj for testing
    employeService = jasmine.createSpyObj('EmployeService', ['loginEmployee',]);
    router = jasmine.createSpyObj('Router',['navigate',]);
    localStorageService = jasmine.createSpyObj('LocalStorageService',['setItem',]);
    snackbar = jasmine.createSpyObj('MatSnackBar',['open',]);
  // }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeloginComponent ],
      providers : [
        {provide : EmployeService, useValue:employeService},
        {provide : Router, useValue:router},
        {provide : LocalStorageService, useValue:localStorageService},
        {provide : MatSnackBar, useValue: snackbar},
      ],
      imports:[
        RouterTestingModule,

      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeloginComponent);
    component = fixture.componentInstance;
// injecting services to the testbed
    employeService= TestBed.inject(EmployeService) as jasmine.SpyObj<EmployeService>;
    router= TestBed.inject(Router) as jasmine.SpyObj<Router>;
    localStorageService= TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
    snackbar= TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;



    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
