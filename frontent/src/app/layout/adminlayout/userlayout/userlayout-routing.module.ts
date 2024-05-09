import { RouterModule, Routes } from "@angular/router";
import { UserlayoutComponent } from "./userlayout.component";
import { CardbodyComponent } from "src/app/widgets/cardbody/cardbody.component";
import { NgModule } from "@angular/core";
import { UserdisplayComponent } from "../../../user/userdisplay/userdisplay.component";
import { UserviewComponent } from "../../../user/userview/userview.component";
import { HomeproductComponent } from "src/app/homeproduct/homeproduct.component";
import { CartpageComponent } from "../../../user/cartpage/cartpage.component";
import { OrderHistoryComponent } from "../../../user/order-history/order-history.component";



const routes: Routes = [

    {path: '', component:UserlayoutComponent,


     children: [ {path : 'productdisplay',component:HomeproductComponent},
                 {path:'userdisplay',component:UserdisplayComponent},
                 {path:'otherusers',component:UserviewComponent},
                 {path:'cartpage',component:CartpageComponent},
                 {path:'orderHistory',component:OrderHistoryComponent},


     ]
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HomeUserRoutes { }
