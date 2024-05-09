import { Component, OnInit } from '@angular/core';
import { EmployeService } from 'src/app/Services/employe.service';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit{
  listOfEmployee: any;
  id!: number;
  constructor(private employeService: EmployeService){}
  ngOnInit(): void {
    this.getEmployees()
  }

getEmployees(){
  this.employeService.getAllEmployees().subscribe({
    next:(response)=> {
      this.listOfEmployee=response;
    },
    error: (error) => {
      console.log('error in fetching data',error)
    }
    
  });
}
}

