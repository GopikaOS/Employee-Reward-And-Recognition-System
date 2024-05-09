import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeService } from 'src/app/Services/employe.service';

@Component({
  selector: 'app-top-performer',
  templateUrl: './top-performer.component.html',
  styleUrls: ['./top-performer.component.css']
})
export class TopPerformerComponent implements OnInit {
  topPerformer: any;
  @ViewChild('videoPlayer') videoPlayer!: any;
  topPerformers: any;

  constructor(private employeService: EmployeService) { }

  ngOnInit(): void {
    this.getTopPerformers();
  }
  getTopPerformers() {
    this.employeService.getTopPerformer().subscribe({
      next: (response) => {
        this.topPerformers = response;
        console.log(this.topPerformers)
      },
      error: (error) => {
        console.error('error in fecthing top performer :', error);
      }
    })
  }
}


