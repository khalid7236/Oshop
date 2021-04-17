import { ProductService } from './../../product.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { product } from 'src/app/DTO/product';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  products !: any[];
  filteredProducts!: product[];
  subsription!: Subscription;
  tableResouce!: MatTableDataSource<product>;
  items!: product[];
  itemCount!: number;
  displayedColumns: string[] = ['title', 'price', 'edit'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private product: ProductService) {
    this.subsription = product.getAll().snapshotChanges().subscribe((p: any) => {
      this.filteredProducts = this.products = p;
      this.tableResouce = new MatTableDataSource<product>(p);
      this.tableResouce.paginator = this.paginator;
      this.tableResouce.sort = this.sort;
    });
  }

  filter(query: string) {
    this.filteredProducts = query ? this.products.filter(p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  applyFilter(filterValue: string) {

    this.filteredProducts = filterValue ? this.products.filter(p =>
      p.payload.val().title.toLowerCase().includes(filterValue.toLowerCase())) : this.products;
    this.tableResouce = new MatTableDataSource<product>(this.filteredProducts);
    this.tableResouce.paginator = this.paginator;
    if (this.tableResouce.paginator) {
      this.tableResouce.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.subsription.unsubscribe();
  }

}
