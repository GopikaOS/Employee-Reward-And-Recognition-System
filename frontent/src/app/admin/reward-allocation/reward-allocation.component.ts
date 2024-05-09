import { Component, OnInit } from '@angular/core';
import { EmployeService } from 'src/app/Services/employe.service';
import { AddrewardComponent } from '../addreward/addreward.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reward-allocation',
  templateUrl: './reward-allocation.component.html',
  styleUrls: ['./reward-allocation.component.css']
})
export class RewardAllocationComponent implements OnInit {


  id!: number;
  listOfAward: any;
  bsModalRef: any;

  constructor(private employeService: EmployeService, private modalService: BsModalService,
    private router: Router,
    private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.getAwards()

  }
  getAwards() {
    this.employeService.displayAwardAllocation().subscribe({
      next: (response) => {
        this.listOfAward = response;
      },
      error: (error) => {
        console.error('error in fetching data :', error);
      }

    })
  }
  addRewards() {
    this.employeService.bsModalRef = this.modalService.show(AddrewardComponent);
    this.modalService.onHide.subscribe({
    next : () => {
      this.ngOnInit()
    }
      }
    )
  }


}
