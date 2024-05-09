import { NgModule } from "@angular/core";
import { AdminlayoutComponent } from "./adminlayout.component";
import { CommonModule } from "@angular/common";
import { HomeadminRoutes } from "./adminlayout-routing.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { InputComponent } from "src/app/widgets/input/input.component";
import { CardbodyComponent } from "src/app/widgets/cardbody/cardbody.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SignuppageComponent } from "src/app/admin/signuppage/signuppage.component";


@NgModule({
    declarations: [AdminlayoutComponent,
      SignuppageComponent
    ],

    imports: [
      CommonModule,
      HomeadminRoutes,
      MatToolbarModule,
      ReactiveFormsModule,
      InputComponent,    
      CardbodyComponent,
     
      
    ],
    exports : [SignuppageComponent ]
  })
  export class Adminlayout {}
  