import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as fontawesome from '@fortawesome/free-solid-svg-icons';
import { ProductReadService } from '../../../../services/product/product-read.service';
import { Product } from '../../../../domain/model/product.model';
import { ProductDeleteService } from '../../../../services/product/product-delete.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    FontAwesomeModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  fa = fontawesome;

  // items: PeriodicElement[] = ELEMENT_DATA;
  products: Product[];

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private productReadService: ProductReadService,
    private productDeleteService: ProductDeleteService) {
  }
  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts() {
    let products = await this.productReadService.findAll();
    this.products = products;
  }

  async deleteProduct(productId: string) {
    try {
      console.log(`productId: ${productId}`);
      console.log(productId);
      await this.productDeleteService.delete(productId);

      this.toastr.success('Item removido com sucesso!');
      this.loadProducts();
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }
}

// export interface PeriodicElement {
//   id: number;
//   name: string;
//   price: number;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { id: 1, name: 'Hydrogen', price: 44.54 },
//   { id: 2, name: 'Helium', price: 34.65 },
//   { id: 3, name: 'Lithium', price: 24.23 },
//   { id: 4, name: 'Beryllium', price: 36.89 },
//   { id: 5, name: 'Boron', price: 78.78 },
//   { id: 6, name: 'Carbon', price: 99.56 },
//   { id: 7, name: 'Nitrogen', price: 12.45 },
//   { id: 8, name: 'Oxygen', price: 89.12 },
// ];
