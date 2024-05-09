import { NgModule } from "@angular/core";
import { UserlayoutComponent } from "./userlayout.component";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from "src/app/widgets/input/input.component";
import { CardbodyComponent } from "src/app/widgets/cardbody/cardbody.component";
import { HomeUserRoutes } from "./userlayout-routing.module";



@NgModule({
    declarations: [UserlayoutComponent
      
    ],

    imports: [
      CommonModule,
      MatToolbarModule,
      ReactiveFormsModule,
      InputComponent,    
      CardbodyComponent,
      HomeUserRoutes,
      
    ],
  })
  export class Userlayout {}
  