import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../../../domain/model/product.model';
import { ProductReadService } from '../../../../services/product/product-read.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  // product = {
  //   id: 1
  // }
  product?: Product;

  constructor(
    private productReadService: ProductReadService,
    private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    this.loadProductById(productId!);
  }

  async loadProductById(productId: string) {
    let product = await this.productReadService.findById(productId);
    this.product = product;
  }
}
