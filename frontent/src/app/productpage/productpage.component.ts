import { Component, OnInit } from '@angular/core';
import { EmployeService } from '../Services/employe.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from '../Services/shared-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})
export class ProductpageComponent implements OnInit {

  public productform!: UntypedFormGroup;
  public files: File[] = [];
  public formValue!: any;
  constructor(private formBuilder: UntypedFormBuilder, private employeService: EmployeService, private _SignupFormData: SharedServiceService,
    private _snackBar: MatSnackBar,
    private modal:BsModalService,
    private router: Router   ) { }

  ngOnInit(): void {
    this.ProductForm();
    console.log(this._SignupFormData.SignupFormData)
  }

  ProductForm() {
    this.productform = this.formBuilder.group({
      productName: ['', [Validators.required,Validators.pattern("[A-Za-z]*")]],
      manufacturerName: ['', Validators.compose([Validators.required])],
      bytesPoints: ['', Validators.compose([Validators.required])],
      productCategory: ['', Validators.compose([Validators.required])],
      size: ['' ,Validators.compose([Validators.required])],
      inStock: ['',Validators.compose([Validators.required])],
      warrantyInfo: ['',Validators.compose([Validators.required])],
      expiryDate: ['',Validators.compose([Validators.required])],
      description: ['',Validators.compose([Validators.required])],
    });

  }
  submit() {
    console.log(this.productform.value);

    if (this.productform?.valid) {
      const formData: FormData = new FormData();
      this.formValue = this.productform?.value;
      const productDataString = JSON.stringify(this.formValue);
      formData.append('productData', productDataString);
      formData.append('file', this.files[0]);
      console.log("formdata1 ", formData.get('file'));
      console.log("formdata2 ", formData.get('productData'));
      this.employeService.createProduct(formData).subscribe(
        (response: any) => {
          console.log('product added successfully :', response);
          this.showMessage("product added successfully");
          this.router.navigate(['admin/product']);
        }
      )
    }
    else{
       this.showMessage('something went wrong');
    }
  }
  uploadFile(event: FileList | any) {
    console.log(event)
    this.files = event?.target?.files;
  }
  showMessage(message:string): void {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
  cancel(){
    this.router.navigate(['/admin/product']);
  }
}


