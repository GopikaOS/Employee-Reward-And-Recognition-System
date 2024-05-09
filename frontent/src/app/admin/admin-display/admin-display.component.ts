import { Component } from '@angular/core';
import { EmployeService } from 'src/app/Services/employe.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-admin-display',
  templateUrl: './admin-display.component.html',
  styleUrls: ['./admin-display.component.css'],
})
export class AdminDisplayComponent {
  adminDisplay!: any;
  id?: string | null;
  name?: string | null;
  email?: any | null;
  phoneNumber?: any | null;
  role?: string | null;
  password?: any | null;
  totalBytesPoints?: number;
  currentBytePoints?: number;
  userId!: number;
  fetchUserDetailsById: any;
  usersCount: any;
  activeUsersCount: number | any;
  employeeCount: number | any;
  adminCount: any;
  constructor(
    private employeeService: EmployeService,
    private localstorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    const userId = JSON.parse(
      this.localstorageService.getItem('userdetail')!
    ).id;
    this.userId = userId;
    this.userDetailsById();
    this.activeUserCount();
    this.activeEmployeeCount();
    this.activeAdminCount();
  }
  userDetailsById() {
    this.employeeService.FetchingUserDetailsById(this.userId).subscribe({
      next: (response) => {
        this.adminDisplay = response;
        this.fetchUserDetailsById = response;
      },
      error: (error) => {
        console.log('error in fetching admin details', error);
      },
    });
  }

  activeUserCount() {
    this.employeeService.getAllActiveUsersCount().subscribe({
      next: (response: number) => {
        this.activeUsersCount = response;
        console.log('active users count', this.activeUsersCount);
      },
      error: (error) => {
        console.log('error in fetching user Count', error);
      },
    });
  }
  activeEmployeeCount() {
    this.employeeService.getEmployeesCount().subscribe({
      next: (response: number) => {
        this.employeeCount = response;
      },
      error: (error) => {
        console.log('error in fetching Employee Count', error);
      },
    });
  }
  activeAdminCount() {
    this.employeeService.getAdminCount().subscribe({
      next: (response: number) => {
        this.adminCount = response;
      },
      error: (error) => {
        console.log('error in fetching Admin Count', error);
      },
    });
  }
}
