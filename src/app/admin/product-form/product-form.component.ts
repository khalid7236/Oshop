import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { SnapshotAction } from '@angular/fire/database';
import { product } from 'src/app/DTO/product';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  outputproduct = new product();
  id;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
    , private productservice: ProductService) {
    this.categories$ = categoryService.getAll().snapshotChanges();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productservice.get(this.id).valueChanges().pipe(take(1)).subscribe((p: any) => {
        this.outputproduct = p
      })
    }
  }

  save(product: any) {
    if (this.id) {
      this.productservice.update(this.id, this.outputproduct);
    }
    else {
      this.productservice.create(product);
    }
    this.router.navigate(['admin/admin-products']);
  }

  delete() {
    if (confirm('Are you sure want to delete this product?')) {
      if (this.id)
        this.productservice.delete(this.id);
      this.router.navigate(['admin/admin-products']);
    }
  }

  ngOnInit(): void {
  }

}
