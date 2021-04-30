import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../interface/Ishopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$: Observable<ShoppingCart> | undefined;

  constructor(private shoppingCartSer: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartSer.getCart();
  }

   clearCart(){
     this.shoppingCartSer.clearCart();
   }
}
