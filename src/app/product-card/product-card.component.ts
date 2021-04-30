import { ShoppingCartItem } from './../interface/Ishopping-cart-item';
import { product } from './../DTO/product';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '../interface/Ishopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product!: product;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
