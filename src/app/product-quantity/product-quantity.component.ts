import { ShoppingCart } from './../interface/Ishopping-cart';
import { Component, Input, OnInit } from '@angular/core';
import { product } from '../DTO/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product!: product;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {
    
   }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
    console.log(this.product);
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
