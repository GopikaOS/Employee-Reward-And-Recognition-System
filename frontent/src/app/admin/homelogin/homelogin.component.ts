import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EmployeService } from 'src/app/Services/employe.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-homelogin',
  templateUrl: './homelogin.component.html',
  styleUrls: ['./homelogin.component.css'],
})
export class HomeloginComponent implements OnInit {
  bsModalRef?: BsModalRef;
  public form!: UntypedFormGroup;
  public emailRegexp: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public formValue!: any;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private employeService: EmployeService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.form = this._formBuilder.group({
      email: ['', Validators.compose([Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  submit() {
    if (this.form?.invalid) {
      return;
    }
    const formData = this.form?.value;
    if (this.form.valid) {
      this.employeService
        .loginEmployee(formData.email, formData.password)
        .subscribe({
          next: (response) => {
            console.log(response);
            if (response !== null) {
              this.localStorageService.setItem(
                'userdetail',
                JSON.stringify(response)
              );
              if (response.role === 'Admin' && response.deleted === false) {
                this.router.navigate(['/admin']);
              } else if (
                response.role === 'Employee' &&
                response.deleted === false
              ) {
                this.router.navigate(['/user']);
              }
            } else {
              this.showMessage('Sorry.invalid Username or Password');
            }
          },
          error: (error) => {
            console.log('error in validating employee', error);
            this.showMessage(
              'Error in validating employee.please try again later'
            );
          },
        });
    } else {
      this.showMessage('Form is invalid. Please fill all required fields.');
    }
  }

  showMessage(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
