import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Product } from '../../domain/model/product.model';
import { ProductReadService } from './product-read.service';

@Injectable({
  providedIn: 'root'
})
export class ProductUpdateService {

  constructor(
    private http: HttpClient,
    private productReadService: ProductReadService) { }

  async update(id: string, name: string, price: number) {
    let itemToUpdate: Product = await this.productReadService.findById(id);
    if (itemToUpdate == null) {
      throw new Error('produto nao encontrado');
    }
    itemToUpdate.name = name;
    itemToUpdate.price = price;
    return await firstValueFrom(this.http.put(`http://localhost:8081/product/${id}`, itemToUpdate));
  }

}
