import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeService } from 'src/app/Services/employe.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  purchasingHistoryById!: any[];
  userId!: number;
  displayedColumns: string[] = ['ID', 'BytesPoint','Item','ItemName','Status','Date'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeService: EmployeService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    const userId = JSON.parse(this.localStorageService.getItem('userdetail')!).id;
    this.userId = userId;
    this.purchasingHistory();
  }

  purchasingHistory() {
    this.employeService.orderHistory(this.userId).subscribe({
      next: (response) => {
        this.purchasingHistoryById = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log("alltransaction", this.dataSource);
        console.log(this.purchasingHistoryById);
      },
      error: (error) => {
        console.log("error in fetching data", error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
