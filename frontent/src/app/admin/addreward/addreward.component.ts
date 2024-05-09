import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EmployeService } from 'src/app/Services/employe.service';

@Component({
  selector: 'app-addreward',
  templateUrl: './addreward.component.html',
  styleUrls: ['./addreward.component.css'],
})
export class AddrewardComponent implements OnInit {
  public rewardform!: FormGroup;
  formValue: any;
  constructor(
    private formBuilder: FormBuilder,
    private employeService: EmployeService,
    private _snackBar: MatSnackBar,
    private modalService: BsModalService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.addReward();
  }

  addReward() {
    this.rewardform = this.formBuilder.group({
      awardName: ['', Validators.required],
      bytesPoints: ['', Validators.required],
    });
  }
  submit() {
    if (this.rewardform.valid) {
      this.employeService.addReward(this.rewardform.value).subscribe({
        next: (response) => {
          this.showMessage('Reward added successfully');
          this.modalService.hide();
        },
        error: (error) => {
          this.showMessage(error.error);
        },
      });
    }
  }
  showMessage(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
  close() {
    this.modalService.hide();
  }
}
