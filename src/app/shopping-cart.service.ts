import { map, take } from 'rxjs/operators';
import { product } from 'src/app/DTO/product';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { ShoppingCart } from './interface/Ishopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(
      map((action: any) => {
        const items = action.payload.val().items;
        return new ShoppingCart(items);
      })
    )
  }

  async removeFromCart(prod: product) {
    this.updateItemQuantity(prod, -1);
  }

  async addToCart(prod: product) {
    this.updateItemQuantity(prod, 1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }



  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');

    if (!cartId) {

      let result = await this.create();
      if (result.key) {
        localStorage.setItem('cartId', result.key);
        return result.key;
      }
    } else
      return cartId;

    return null;
  }

  private async updateItemQuantity(prod: product, change: number) {
    let cartId = await this.getOrCreateCartId();
    if (cartId) {
      let item$ = this.getItem(cartId, prod.key);
      item$
        .snapshotChanges()
        .pipe(take(1))
        .subscribe((item: any) => {

          let quantity = (item.payload.exists() ? item.payload.val()['quantity'] : 0) + change;
          item$.update({
            product: prod,
            quantity: quantity
          });
        });
    }
  }
}
