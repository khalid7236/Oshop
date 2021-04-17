import { CategoryService } from './../../category.service';
import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/interface/iCategory';
import { AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {


  categoryList: AngularFireList<Category>;
  categories: Category[] = [];
  @Input('category') category!: string;

  constructor(cateroryService: CategoryService) {

    this.categoryList = cateroryService.getAllC2();
    this.categoryList.snapshotChanges().forEach(actions =>
      actions.forEach(action => {
        let c = action.payload.val() as Category;
        c.key = action.key as string;
        this.categories.push(c);
      })
    );
  }

  ngOnInit(): void {
  }

}
