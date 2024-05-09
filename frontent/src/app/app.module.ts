import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeloginComponent } from './admin/homelogin/homelogin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputComponent } from './widgets/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { HomeproductComponent } from './homeproduct/homeproduct.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { CardbodyComponent } from './widgets/cardbody/cardbody.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { UserListpageComponent } from './admin/user-listpage/user-listpage.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { BytesallocationComponent } from './admin/bytesallocation/bytesallocation.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminDisplayComponent } from './admin/admin-display/admin-display.component';
import { UserdisplayComponent } from './user/userdisplay/userdisplay.component';
import { SearchFilterPipe } from "./admin/pipe/searchfilter.pipe";
import { UserviewComponent } from './user/userview/userview.component';
import { RewardAllocationComponent } from './admin/reward-allocation/reward-allocation.component';
import {MatDialogModule} from '@angular/material/dialog';
import { TopPerformerComponent } from './admin/top-performer/top-performer.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AddrewardComponent } from './admin/addreward/addreward.component';
import { AddtocartComponent } from './user/addtocart/addtocart.component';
import { CartpageComponent } from './user/cartpage/cartpage.component';
import { OrderHistoryComponent } from './user/order-history/order-history.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { TransactionComponent } from './admin/transaction/transaction.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';




@NgModule({
    declarations: [
        AppComponent,
        HomeloginComponent,
        HomeproductComponent,
        ProductpageComponent,
        NavbarComponent,
        UserListpageComponent,
        BytesallocationComponent,
        AdminDisplayComponent,
        UserdisplayComponent,
        UserviewComponent,
        RewardAllocationComponent,
        TopPerformerComponent,
        AddrewardComponent,
        AddtocartComponent,
        CartpageComponent,
        OrderHistoryComponent,
        TransactionComponent,
        PagenotfoundComponent,
    ],
    providers: [BsModalService],
    bootstrap: [AppComponent],

    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        InputComponent, ReactiveFormsModule,
        ModalModule.forRoot(),
        HttpClientModule,
        CardbodyComponent,
        MatSidenavModule,
        MatSelectModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        FormsModule,
        SearchFilterPipe,
        MatDialogModule,
        MatSnackBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule
    ]
})
export class AppModule { }
