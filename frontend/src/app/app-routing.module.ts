import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { CategoryListComponent } from './pages/admin/category-list/category-list.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { UpdateProductComponent } from './pages/admin/update-product/update-product.component';
import { ViewProductImagesComponent } from './pages/admin/view-product-images/view-product-images.component';
import { ViewProductComponent } from './pages/admin/view-product/view-product.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserAddressComponent } from './pages/user/user-address/user-address.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { UserOrdersComponent } from './pages/user/user-orders/user-orders.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:'admin',
    component:AdminDashboardComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'',
        component:AdminHomeComponent
      },
      {
        path:'view-categories',
        component:CategoryListComponent
      },
      {
        path:'add-category',
        component:AddCategoryComponent
      },
      {
        path:'update-category/:cat_id',
        component:UpdateCategoryComponent
      },
      {
        path:'view-products',
        component:ViewProductComponent
      },
      {
        path:'add-product',
        component:AddProductComponent
      },
      {
        path:'update-product/:product_id',
        component:UpdateProductComponent
      },
      {
        path:'view-images/:product_id',
        component:ViewProductImagesComponent
      }
    ]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[NormalGuard],
    children:[
      {
        path:'',
        component:ProfileComponent
      },
      {
        path:'address',
        component:UserAddressComponent
      },
      {
        path:'orders',
        component:UserOrdersComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
