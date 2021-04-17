import { Category } from './interface/iCategory';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { product } from './DTO/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase, private db2: AngularFirestore) { }

  getAll() {
    return this.db
      .list<string>('/categories', ref => ref.orderByChild('name'));
  }


  getAllC2() {
    return this.db
      .list<Category>('/categories', ref => ref.orderByChild('name'));
  }


  getAlldb2() {
    return this.db.list<product>('products');
  }
}
