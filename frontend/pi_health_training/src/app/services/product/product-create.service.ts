import { Injectable } from '@angular/core';
import { Product } from '../../domain/model/product.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCreateService {

  constructor(private http: HttpClient) { }

  async create(product: Product) {
    console.log(product);
    return firstValueFrom(this.http.post(`http://localhost:8081/product`, product));
  }
}
