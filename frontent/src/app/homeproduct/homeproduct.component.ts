import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EmployeService } from '../Services/employe.service';
import { AddtocartComponent } from '../user/addtocart/addtocart.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-homeproduct',
  templateUrl: './homeproduct.component.html',
  styleUrls: ['./homeproduct.component.css']
})
export class HomeproductComponent implements OnInit {
  totalListofProducts:any;
  modalRef: any;
  bsModalRef?: any;
  listOfProduct: any;
  searchTerm: string = '';
  Admin: boolean = true;
  Employee: boolean = false;
  public searcher: string = '';

product: any;


  constructor(private modalService: BsModalService,
    private employeService: EmployeService,
    private router: Router, private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.getProduct();
    this.getAdmin();
    // storage value take

  }
  addproductbox() {
    this.router.navigate(['admin/addProduct']);
  }

  getProduct() {
    this.employeService.displayProduct().subscribe({
      next: (response) => {
        console.log("response %j", response)
        this.totalListofProducts = response;
        this.listOfProduct = this.totalListofProducts.filter((product:any)=> product.deleted === false);
        console.log('listofproduct %j', this.listOfProduct)
      },
      error: (error) => {
        console.error("error fetching product data", error);
      }
    });
  }

  get filteredListOfProduct() {
    return this.listOfProduct.filter((product: { category: string; }) =>
      product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  searchProducts() { }

  deleteProduct (product: any) {
    this.employeService.deletingProduct(product.productId).subscribe({
      next:(response) => {
        console.log(response);
        this.showMessage("product deleted successfully");
        this.listOfProduct = this.listOfProduct.filter((prod: any) => prod.productId !== product.productId);
      },
      error:(error)=>{
        console.log(error);
        this.showMessage("something went wrong");
      },
    });
  }

  getAdmin() {
    const getuser: any = localStorage.getItem('userdetail');
    console.log(getuser);
    console.log(JSON.parse(getuser));
    if (JSON.parse(getuser)?.role === "Employee") {
      this.Admin = false;
      this.Employee = true;
      console.log(getuser.role)
    }
  }
  buynow(data: any) {
    console.log(data)
    const initialState = { data: data };
    this.bsModalRef = this.modalService.show(AddtocartComponent, { initialState });
    this.bsModalRef.content.data = data;
  }

  showMessage(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }


}
