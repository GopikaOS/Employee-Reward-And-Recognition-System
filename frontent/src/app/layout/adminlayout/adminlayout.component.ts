import { LocalStorageService } from './../../Services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.css']
})
export class AdminlayoutComponent implements OnInit {

  constructor(private router: Router, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {

  }

  logout(){
      this.localStorageService.removeItem('userdetail');
      this.router.navigate(["/"])

  }


}
