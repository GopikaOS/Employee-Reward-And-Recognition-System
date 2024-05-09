import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  usersData: any = this.localstorageService.getItem('userdetail');
  id = JSON.parse(this.usersData)['id'];
  cart: any = JSON.parse(localStorage.getItem('cart') || '{}');
  user: any = JSON.parse(localStorage.getItem('userdetail') || '{}');
  constructor(private localstorageService: LocalStorageService) {}

  addToCart(product: any) {
    product.quantity = 1;
    console.log('original quantity' + product.quantity);
    // Retrieve cart data from local storage
    const cartDataString = localStorage.getItem('cart');
    this.cart = cartDataString ? JSON.parse(cartDataString) : {};
    if (!this.cart[this.user.id]) {
      this.cart[this.user.id] = {};
    }
    this.cart[this.user.id][product.productId] = product;
    localStorage.setItem('cart', JSON.stringify(this.cart));
    return this.cart[this.user.id];
  }

  removeFromCart(productId: any) {
    delete this.cart[this.user.id][productId];
    localStorage.setItem('cart', JSON.stringify(this.cart));
    return this.cart;
  }

  incrementQuantity(productId: any) {
    console.log(this.cart);
    if (
      this.cart[this.id][productId].inStock >=
      this.cart[this.id][productId].quantity
    ) {
      this.cart[this.id][productId]['quantity']++;
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }
  decrementQuantity(productId: any) {
    if (this.cart[this.id][productId]['quantity'] > 1) {
      this.cart[this.id][productId]['quantity']--;
    } else {
      delete this.cart[this.id][productId];
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getUserCart(id: any) {
    console.log(`this.cart[${this.user.id}] = ${this.cart[this.user.id]}`);
    console.log(
      `this.cart[${this.user.id}] = ${JSON.stringify(this.cart[this.user.id])}`
    );
    return this.cart[id] || {};
  }
  setUserCartEmpty(){
    this.localstorageService.removeItem('cart')
    this.cart = []
  }
}
