import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmployeService } from 'src/app/Services/employe.service';

@Component({
  selector: 'app-user-listpage',
  templateUrl: './user-listpage.component.html',
  styleUrls: ['./user-listpage.component.css'],
})
export class UserListpageComponent implements OnInit {
  listOfEmployee: any;

  id!: number;

  constructor(
    private employeService: EmployeService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees() {
    this.employeService.displayall().subscribe((formData: any) => {
      this.listOfEmployee = formData;
      console.log(formData);
      const employees = this.listOfEmployee.filter(
        (employee: { role: string }) => employee.role === 'Employee'
      );
      this.listOfEmployee = employees;
    });
  }

  onDelete(id: number) {
    console.log(id);
    this.employeService.deleteUser(id).subscribe({
      next: (response) => {
        this.showMessage('User deleted successfully.');
        this.listOfEmployee = this.listOfEmployee.filter((employee: any) => employee.id !== id);
      },
      error: (error) => {
        console.error('Error deleting user:', error);
        this.showMessage('Error deleting user. Please try again later.');
      },
    });
  }

  showMessage(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  onEdit(id: number) {
    this.router.navigate([`admin/signup/${id}/${true}`]);
  }
}
