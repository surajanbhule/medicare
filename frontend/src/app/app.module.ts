import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component'
import { AuthInterceptor } from './services/auth.interceptor';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminSidebarComponent } from './pages/admin/admin-sidebar/admin-sidebar.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { UserSidebarComponent } from './pages/user/user-sidebar/user-sidebar.component';
import { UserAddressComponent } from './pages/user/user-address/user-address.component';
import { UserOrdersComponent } from './pages/user/user-orders/user-orders.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { CategoryListComponent } from './pages/admin/category-list/category-list.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { ViewProductComponent } from './pages/admin/view-product/view-product.component';
import { UpdateProductComponent } from './pages/admin/update-product/update-product.component';
import { NgxUiLoaderBlurredDirective, NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { ViewProductImagesComponent } from './pages/admin/view-product-images/view-product-images.component';
import { ViewUsersComponent } from './pages/admin/view-users/view-users.component';
import { ProductTitlePipe } from './pipe/product-title.pipe';
import { ViewCartComponent } from './pages/user/view-cart/view-cart.component';
import { OrderComponent } from './pages/user/order/order.component';
import { AddAddressComponent } from './pages/user/add-address/add-address.component';
import { UpdateAddressComponent } from './pages/user/update-address/update-address.component';
import { ViewUserAddressComponent } from './pages/user/view-user-address/view-user-address.component';
import { PendingOrdersComponent } from './pages/admin/pending-orders/pending-orders.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { NotificationComponent } from './pages/user/notification/notification.component';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    AdminSidebarComponent,
    AdminHomeComponent,
    UserSidebarComponent,
    UserAddressComponent,
    UserOrdersComponent,
    AddCategoryComponent,
    CategoryListComponent,
    UpdateCategoryComponent,
    AddProductComponent,
    ViewProductComponent,
    UpdateProductComponent,
    ViewProductImagesComponent,
    ViewUsersComponent,
    ProductTitlePipe,
    ViewCartComponent,
    OrderComponent,
    AddAddressComponent,
    UpdateAddressComponent,
    ViewUserAddressComponent,
    PendingOrdersComponent,
    UpdateUserComponent,
    ChangePasswordComponent,
    NotificationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
