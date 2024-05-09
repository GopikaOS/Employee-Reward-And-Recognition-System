import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EmployeService } from 'src/app/Services/employe.service';


@Component({
  selector: 'app-cardbody',
  templateUrl: './cardbody.component.html',
  styleUrls: ['./cardbody.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CardbodyComponent implements OnInit {
  @Input() cardData!: any;
  @Input() role!: string;
  @Output() productEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();

  isRoleAdmin: boolean = false;
  bsModalRef?: any;
  private _snackBar: any;
  constructor(private modalService: BsModalService,private employeService: EmployeService) { }
  ngOnInit(): void {
    this.getRole();
  }

  getRole() {
    const getuser: any = localStorage.getItem('userdetail');
    console.log(getuser);
    console.log(JSON.parse(getuser));
    if (JSON.parse(getuser)?.role === 'Admin') {
      this.isRoleAdmin = true;
    }
  }
  buyBox() {
    this.productEvent.emit()
  }

  ondelete(productId:number){
    console.log(productId);
    this.deleteEvent.emit(productId);
  }



}

