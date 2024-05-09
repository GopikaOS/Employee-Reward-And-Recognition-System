import { EmployeService } from './../../../Services/employe.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userlayout',
  templateUrl: './userlayout.component.html',
  styleUrls: ['./userlayout.component.css']
})
export class UserlayoutComponent {

  constructor(private router: Router,) {}

  ngOnInit(): void {
    this.router.navigate(['user/userdisplay']);
  }

}
