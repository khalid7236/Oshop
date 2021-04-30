import { product } from 'src/app/DTO/product';
import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../interface/Ishopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appuser: AppUser | undefined;
  cart$: Observable<ShoppingCart> | undefined;

  constructor(public auth: AuthService,
    private shoppinCart: ShoppingCartService) {

  }

  async ngOnInit() {
    this.auth.appUser$.subscribe((appuser: any) => this.appuser = appuser);
    this.cart$ = await this.shoppinCart.getCart();

    // cart$.snapshotChanges().pipe().subscribe(cart => {
    //   this.shoppingCartItemCount = 0;
    //   const items = cart.payload.val()?.items;

    //   if (items)
    //     for (let productId in items) {
    //       this.shoppingCartItemCount += items[productId].quantity;
    //     }
    // })

  }

  logout() {
    this.auth.logout();
  }
}
