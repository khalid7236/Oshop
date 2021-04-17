import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { product } from './DTO/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  //outputProduct: product | undefined;


  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products');
  }

  get(id: string) {
    return this.db.object('products/' + id);
  }

  update(id: string, objProduct: product) {
    return this.db.object('/products/' + id).update(objProduct);
  }

  delete(id: string) {
    return this.db.object('/products/' + id).remove();
  }

}
