import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CartService } from 'src/app/Services/cart.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent implements OnInit {

  public data: any;
  public form!: UntypedFormGroup;
  bsModalRef!: BsModalRef;
  id!: number | string | any;

  constructor(
    private fb: FormBuilder,
    private localstorageService: LocalStorageService,
    private modalService: BsModalService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const userData: any = this.localstorageService.getItem("userdetail");
    this.id = JSON.parse(userData)["id"];
    this.form = this.fb.group({
      quantity: [null, [Validators.required, Validators.min(1)]]
    });
  }

  close() {
    this.modalService.hide();
  
  }

  addingProductToCart() {
    let addToCartProduct = this.data
    const cart = this.cartService.addToCart(addToCartProduct);
    console.log(cart);
    this.modalService.hide();
    this.showMessage();

  }

  showMessage(): void {
    const snackBarRef: MatSnackBarRef<any> = this._snackBar.open('Product added to the cart successfully', 'Close', {
      duration: 2000,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('Snackbar dismissed');
    });
  }

}

