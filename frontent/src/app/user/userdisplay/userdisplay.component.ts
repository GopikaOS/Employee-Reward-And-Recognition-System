import { Component } from '@angular/core';
import { EmployeService } from 'src/app/Services/employe.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-userdisplay',
  templateUrl: './userdisplay.component.html',
  styleUrls: ['./userdisplay.component.css']
})
export class UserdisplayComponent {

  userDisplay !: any;
  userId !: number;

  id?: string | null;
  name?: string | null;
  email?: any | null;
  phoneNumber?: any | null;
  role?: string | null;
  password?: any | null;
  department?: string | null;
  fetchUserDetailsById: any;

  constructor(private employeeService: EmployeService, private localstorageService: LocalStorageService) { }

  ngOnInit(): void {
    const userId = JSON.parse(this.localstorageService.getItem('userdetail')!).id
    this.userId = userId
    this.userDetailsById()
  }
  userDetailsById() {
    this.employeeService.FetchingUserDetailsById(this.userId).subscribe({
      next: (response) => {
        this.fetchUserDetailsById = response;
        this.userDisplay = response;
      },
      error: (error) => {
        console.log("error in fetching user details", error);
      }
    });
  }
}
