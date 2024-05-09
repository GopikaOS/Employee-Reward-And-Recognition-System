import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, count } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  [x: string]: any;
  bsModalRef!: BsModalRef;


  private apiUrl = 'http://localhost:8080/user/adduser'; // Replace with your Spring Boot backend URL
  constructor(private http: HttpClient ) { }
  createUser(adminData: any): Observable<any> {
  return this.http.post(this.apiUrl, adminData);

  }
  loginEmployee(email:string,password:string):Observable <any> {
      const apiUrl = 'http://localhost:8080/user/login';
      const loginDetails = {email,password }
      return this.http.post(apiUrl,loginDetails);
}

addReward(rewardData: any): Observable<any> {
  const apiUrl = 'http://localhost:8080/user/addawards';
  return this.http.post(apiUrl,rewardData);
}


// product
createProduct(productData: any): Observable<any> {
  const apiUrl = 'http://localhost:8080/user/addproduct';
  return this.http.post(apiUrl,productData);
}

displayProduct():Observable<any>{
  const apiUrl ='http://localhost:8080/user/getproducts';
  return this.http.get(apiUrl);
}

deletingProduct(productId:number):Observable<any>{
  const apiurl = `http://localhost:8080/user/deleteproduct/${productId}`;
  return this.http.delete(apiurl);
}

// fetching details of all users including admin
displayall():Observable<any>{
  const apiUrl ='http://localhost:8080/user/getemployees';
  return this.http.get(apiUrl)
}

bytesallocation(bytesallocation:any):Observable<any>{
  console.log(bytesallocation);

  const apiUrl ='http://localhost:8080/user/addpoints';
  return this.http.post(apiUrl,bytesallocation,{responseType:'text'})
}


deleteUser(userId:number): Observable<any> {
  console.log(userId)
  const apiUrl = `http://localhost:8080/user/deleteUser/${userId}`;
  return this.http.delete(apiUrl);
}


displayDebitedHistory():Observable<any>{
  const apiUrl ='http://localhost:8080/user/debitedtransaction';
  return this.http.get(apiUrl)

}
displayCreditedHistory():Observable<any>{
  const apiurl = 'http://localhost:8080/user/creditedtransaction';
  return this.http.get(apiurl)
}
displayAwardAllocation():Observable<any>{
  const apiurl = 'http://localhost:8080/user/getawards';
  return this.http.get(apiurl)
}

updateUser(userId:number, updatedUser:any):Observable<any>{
  const apiUrl = `http://localhost:8080/user/update/id/${userId}`;
  return this.http.put(apiUrl,{...updatedUser, id: userId},{responseType:"text"});
}
addToCart(cartData:any):Observable<any>{
  const apiUrl = 'http://localhost:8080/user/addtocart';
  console.log(cartData);
  return this.http.post(apiUrl,cartData,{responseType:"text"});
}
purchaseProduct(purchaseData: any): Observable<any> {
  const apiUrl = 'http://localhost:8080/user/purchase/product';
  console.log(purchaseData);
  return this.http.post(apiUrl,purchaseData,{responseType:"text"});
}
orderHistory(userId:number):Observable<any>{
  const apiurl = `http://localhost:8080/user/purchasinghistory/id/${userId}`;
  return this.http.get(apiurl)
}

FetchingUserDetailsById(userId:number):Observable<any>{
  const apiUrl = `http://localhost:8080/user/fetchUserDetailsById/id/${userId}`;
  return this.http.get<any>(apiUrl)
}

getTopPerformer():Observable<any>{
  const apiurl = 'http://localhost:8080/user/topperformer';
  return this.http.get(apiurl)
}
getAllEmployees():Observable<any>{
  const apiurl = 'http://localhost:8080/user/employees';
  return this.http.get(apiurl)
}
getAlltransation():Observable<any>{
  const apiurl = 'http://localhost:8080/user/transaction';
  return this.http.get(apiurl)
}

getAllActiveUsersCount():Observable<any>{
  const apiurl = 'http://localhost:8080/user/activeUsersCount';
  return this.http.get(apiurl)
}
getEmployeesCount():Observable<any>{
  const apiurl = 'http://localhost:8080/user/activeEmployeesCount';
  return this.http.get(apiurl)
}
getAdminCount():Observable<any>{
  const apiurl ='http://localhost:8080/user/adminCount';
  console.log("admin count",this.http.get(apiurl));
  return this.http.get(apiurl)
}
}
