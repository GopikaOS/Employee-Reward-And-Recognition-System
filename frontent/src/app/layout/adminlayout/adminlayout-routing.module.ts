import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeproductComponent } from "src/app/homeproduct/homeproduct.component";
import { AdminlayoutComponent } from "./adminlayout.component";
import { SignuppageComponent } from "src/app/admin/signuppage/signuppage.component";
import { UserListpageComponent } from "src/app/admin/user-listpage/user-listpage.component";
import { BytesallocationComponent } from "src/app/admin/bytesallocation/bytesallocation.component";
import { AdminDisplayComponent } from "src/app/admin/admin-display/admin-display.component";
import { RewardAllocationComponent } from "src/app/admin/reward-allocation/reward-allocation.component";
import { TopPerformerComponent } from "src/app/admin/top-performer/top-performer.component";
import { ProductpageComponent } from "src/app/productpage/productpage.component";
import { TransactionComponent } from "src/app/admin/transaction/transaction.component";


const routes: Routes = [

   {path: '', component: AdminlayoutComponent,


    children: [

      {path : '',component:AdminDisplayComponent},
      {path : 'signup/:id/:isEditMode',component:SignuppageComponent},
      {path : 'product',component:HomeproductComponent},
      {path : 'userList',component:UserListpageComponent},
      {path : 'PointsAllocation',component:BytesallocationComponent},
      {path : 'homeAdmin',component:AdminDisplayComponent},
      {path : 'rewardAllocation',component:RewardAllocationComponent},
      {path :'topPerformer',component:TopPerformerComponent},
      {path : 'addProduct',component:ProductpageComponent},
      {path : 'transaction',component:TransactionComponent},
    ]
   },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeadminRoutes { }
