import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { EmployeService } from '../../Services/employe.service';
import { MatSnackBar } from '@angular/material/snack-bar';


type SelectedEmployee =
  [
    {
      id: string
      name: string
    }
  ]


@Component({
  selector: 'app-bytesallocation',
  templateUrl: './bytesallocation.component.html',
  styleUrls: ['./bytesallocation.component.css']
})

export class BytesallocationComponent implements OnInit {

  @Input() disable: boolean = false;
  public form!: UntypedFormGroup;
  public formValue!: any;
  bytesForm!: UntypedFormGroup;
  listOfEmployee: any;
  bytesPoints!: any;
  selectedEmployee = new FormControl<SelectedEmployee>([{
    id: "",
    name: ""
  }]);
  selectedEmployeesId: string[] = []
  listOfAwards: any;
  other: any;
  rewardId!: any;
  unfilteredListofEmployee: any;

  constructor(private formBuilder: UntypedFormBuilder,
    private employeeService: EmployeService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute, private router: Router
  ) { }

  ngOnInit(): void {
    this.PointsAllocation();
    this.getEmployees();
    this.getAwards();


  }
  PointsAllocation() {
    this.bytesForm = this.formBuilder.group({
      id: [this.selectedEmployee.value, Validators.required],
      rewardId: ["", Validators.required],
    });
  }

  submit() {
    if (this.bytesForm?.invalid) {
      return this.showMessage('please fill all the required field');
    }
    this.formValue = this.bytesForm?.value;
  }
  get forms() {
    return this.bytesForm.controls
  }

  bytespointsallocation() {
    console.log(this.bytesForm?.value);
    if (this.bytesForm?.value.id?.length && this.bytesForm?.value.id.length > 0) {
      this.selectedEmployee.value?.map(emp => this.selectedEmployeesId.push(emp.id));
      console.log(this.selectedEmployee, "this.selectedEmployee");
      console.log(this.selectedEmployeesId);
      this.employeeService.bytesallocation({
        id: this.selectedEmployeesId,
        rewardId: this.bytesForm.value.rewardId
      }).subscribe({
        next: (response) => {
          console.log("points added successfully", response);
          this.showMessage('points added successfully');
          this.router.navigate(['admin/userList']);
        },
        error: (error) => {
          console.log("error in adding bytes points", error);
          this.showMessage('error in adding bytes points! please try again');
        }
      });
      this.bytesForm.reset();
    }
  }

  getEmployees() {
    this.employeeService.getAllEmployees().subscribe((formData: any) => {
      this.unfilteredListofEmployee = formData;
      this.listOfEmployee = this.unfilteredListofEmployee.filter((emp:any) => emp.deleted==false);
      (error: any) => {
        console.error('Error fetching employee data:', error);
      }
    });
  }

  getAwards() {
    this.employeeService.displayAwardAllocation().subscribe((formData: any) => {
      this.listOfAwards = formData;
      console.log(formData)

    })
  }
  awardChange(event: any) {
    console.log(event, event.srcElement?.value);
    if (event.srcElement?.value === 'other') {
      this.other = true;
    } else {
      this.other = false;
    }
    switch (event.srcElement?.value) {
      case 'other':
        this.bytesForm.patchValue({ bytesPoints: 20 });
        break;
      default:

    }
  }
  showMessage(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}

