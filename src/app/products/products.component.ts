import { ShoppingCartService } from './../shopping-cart.service';
import { CategoryService } from './../category.service';
import { Category } from './../interface/iCategory';
import { product } from 'src/app/DTO/product';
import { ProductService } from './../product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { AngularFireList } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: product[] = [];
  productList: AngularFireList<product>;
  filteredPorducts: product[] = [];
  category: string = '';
  cart: any;
  subscription!: Subscription;

  constructor(private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private cateroryService: CategoryService,
    private route: ActivatedRoute) {
    //product
    this.productList = cateroryService.getAlldb2();
    this.productList.snapshotChanges().forEach(actions => {
      actions.forEach(action => {

        let prod = action.payload.val() as product;
        if (action.key)
          prod.key = action.key;
        this.products.push(prod);
      });

      route.queryParamMap.subscribe(params => {
        this.category = params.get('category') as string;
        this.filteredPorducts = this.category ? this.products.filter(p => p.category === this.category) : this.products;
      });
    }
    );
    this.filteredPorducts = this.products;
  };

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => {
        this.cart = cart;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
