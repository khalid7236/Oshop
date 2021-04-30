import { CategoryService } from './category.service';
import { AdminAuthGaurdService } from './admin-auth-gaurd.service';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AuthGaurdService } from './auth-gaurd.service';
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { CheckOutComponent } from './check-out/check-out.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductsComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    CheckOutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DataTablesModule,
    MatSliderModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'oshop'),
    RouterModule.forRoot([
      //anonymous user access components
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'products', component: ProductsComponent },

      //loged in user access components
      { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGaurdService] },
      { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGaurdService] },
      { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGaurdService] },

      //admin only 
      {
        path: 'admin/admin-products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGaurdService, AdminAuthGaurdService]
      },
      {
        path: 'admin/admin-products',
        component: AdminProductsComponent,
        canActivate: [AuthGaurdService, AdminAuthGaurdService]
      },
      {
        path: 'admin/product-form',
        component: ProductFormComponent,
        canActivate: [AuthGaurdService, AdminAuthGaurdService]
      },
      {
        path: 'admin/admin-orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGaurdService, AdminAuthGaurdService]
      },
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    AuthGaurdService,
    CategoryService,
    AngularFirestore,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
