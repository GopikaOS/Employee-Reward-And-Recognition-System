import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/Services/cart.service';
import { EmployeService } from 'src/app/Services/employe.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css']
})
export class CartpageComponent implements OnInit {
  id: any;
  cart: any[] = []; // Initialize the cart array
  quantity: number = 1;
  bytes: any;


  ngOnInit(): void {
    const userData: any = this.localstorageService.getItem("userdetail");
    this.id = JSON.parse(userData)["id"];
    this.bytes = JSON.parse(userData)["currentBytePoints"];
    this.cart = this.cartservice.getUserCart(this.id)
    //  this.purchase();
  }
  constructor(private employeService: EmployeService,
    private cartservice: CartService,
    private localstorageService: LocalStorageService,
    private _snackBar: MatSnackBar,
  ) { }
  incrementQuantity(productId: any) {
    this.cartservice.incrementQuantity(productId);
  }
  decrementQuantity(productId: any) {
    this.cartservice.decrementQuantity(productId);
  }
  getTotalSum(): number {
    return Object.values(this.cart).reduce((sum, product) => sum + (product.bytesPoints * product.quantity), 0);
  }
  getvalues(object: any): any {
    return Object.values(object)
  }
  purchase() {
    if (this.cart) {
      const cartArray = Object.keys(this.cart).map((key: any) => this.cart[key])
      console.log(cartArray)
      let purchaseProduct = {
        userId: this.id,
        productsDetails: cartArray
      };
      console.log(purchaseProduct)

      this.employeService.purchaseProduct(purchaseProduct).subscribe({
        next:(response)=>{
          console.log("product purchased successfully",response)
          this.showMessage('product purchased successfully');
          this.cart = []
          this.cartservice.setUserCartEmpty()
        },
        error:(error)=>{
          console.log('not have enough bytespoints',error);
          this.showMessage('Not have enough BytesPoints');
        }
      });
    }else{
      console.error('cart is empty.Cannot make a purchased.');
      this.showMessage('cart is empty.Cannot make a purchase.');
    }
  }
  showMessage(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
  removefromCart(id: number) {
    this.cartservice.removeFromCart(id);
  }
}




