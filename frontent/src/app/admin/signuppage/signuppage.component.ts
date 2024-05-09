import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { EmployeService } from '../../Services/employe.service';
import { SharedServiceService } from '../../Services/shared-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../../Services/local-storage.service';

@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.css'],
})
export class SignuppageComponent implements OnInit {
  public form!: UntypedFormGroup;
  public emailRegexp: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public formValue!: any;
  updateUserData: any;
  isEditMode!: boolean;
  dismissible: any;
  id!: number;
  listOfEmployee: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private employeService: EmployeService,
    private _SignupFormData: SharedServiceService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private localstorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isEditMode = this.booleanify(
      this.route.snapshot.paramMap.get('isEditMode') || ''
    );
    if (this.isEditMode) {
      this.getEmployees();
    } else {
      this.SignupForm();
    }
    // to pass the id while editing
    const idParam = this.route.snapshot.paramMap.get('id') || '0';
    this.id = parseInt(idParam);
  }

  SignupForm() {
    this.form = this.formBuilder.group({
      name: [
        this.isEditMode ? this.listOfEmployee?.name : '',
        Validators.compose([Validators.required]),
      ],
      email: [
        this.isEditMode ? this.listOfEmployee?.email : '',
        Validators.compose([Validators.email]),
      ],
      phoneNumber: [
        this.isEditMode ? this.listOfEmployee?.phoneNumber : '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\d{10}$/),
        ]),
      ],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])],
      role: [
        this.isEditMode ? this.listOfEmployee?.role : '',
        Validators.compose([Validators.required]),
      ],
    });

    console.log(
      'Role value during edit mode:',
      this.isEditMode ? this.listOfEmployee?.role : ''
    );
  }

  submit() {
    console.log(this.form);
    if (this.form.value.password !== this.form.value.confirmPassword) {
      console.log('Passwords do not match');
      this.showMessage('password not match');
      return false;
    }
    if (this.form?.invalid) {
      console.log('Form is invalid');
      this.showMessage('please fill in all required fields');
      return false;
    }

    this.formValue = this.form?.value;
    console.log('Form value:', this.formValue);
    return true;
  }

  updateUserDetails(formData: UntypedFormGroup): void {
    console.log(this.listOfEmployee?.role, 'ROLE');
    console.log('formData-formData', formData);
    if (this.form.value.password !== this.form.value.confirmPassword) {
      console.log('Passwords do not match');
      this.showMessage('password not match');
      return;
    }


    if (formData) {
      if (this.isEditMode) {
        const oldUserDetails: any = JSON.parse(
          this.localstorageService.getItem('userdetail')!
        );
        console.log('totalBytes' + oldUserDetails.totalBytesPoints);
        this.employeService
          .updateUser(this.id, {
            ...formData.value,
            currentBytePoints: oldUserDetails.currentBytePoints,
            totalBytesPoints: oldUserDetails.totalBytesPoints,
          })
          .subscribe(
            (formData: any) => {
              this.updateUserData = formData;
              console.log('Update successful:', formData);
              this.showMessage('Employee updated successfully');
              this.router.navigate(['admin/userList']);
            },
            (err) => {
              console.log(err);
              this.showMessage(err.error);
            }
          );
      } else {
        this.employeService
          .createUser({
            ...formData.value,
            currentBytePoints: 0,
            totalBytesPoints: 0,
          })
          .subscribe({
            next: (response: any) => {
              this.dismissible = true;
              formData.reset();
              this.showMessage('Employee added successfully');
              this.router.navigate(['admin/userList']);
            },
            error: (err: any) => {
              this.showMessage(err.error);
            },
          });
      }
    }
  }

  private booleanify(value: string): boolean {
    const truthy: string[] = ['true', 'True', '1'];
    return truthy.includes(value);
  }
  getEmployees() {
    this.employeService.displayall().subscribe((formData: any) => {
      let currentUser = formData.filter((e: any) => e.id === this.id);
      this.listOfEmployee = currentUser[0];
      this.SignupForm();
    });
  }

  showMessage(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
