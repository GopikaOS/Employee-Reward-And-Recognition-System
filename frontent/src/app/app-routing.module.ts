import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeloginComponent } from './admin/homelogin/homelogin.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';




const routes: Routes = [
  {path: '', component: HomeloginComponent},

  {path : 'admin', loadChildren: () => import('./layout/adminlayout/adminlayout.module').then((m:typeof import('./layout/adminlayout/adminlayout.module')) => m.Adminlayout),canActivate:[AuthGuard]},

  {path : 'user', loadChildren: () => import('./layout/adminlayout/userlayout/userlayout.module').then((m:typeof import('./layout/adminlayout/userlayout/userlayout.module')) => m.Userlayout),canActivate:[AuthGuard]},

  {path: '**', component: PagenotfoundComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
