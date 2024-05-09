import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeService } from 'src/app/Services/employe.service';
import { AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['ID','Bytespoint','Date','Status','ItemName','UserName'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeService: EmployeService) { }

  ngOnInit(): void {
    this.getAllTransactionHistory();
  }

  ngAfterViewInit() {

  }

  getAllTransactionHistory() {
    this.employeService.getAlltransation().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log("alltransaction", this.dataSource);
      },
      error: (error) => {
        console.log("Error fetching all transaction history:", error);
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

