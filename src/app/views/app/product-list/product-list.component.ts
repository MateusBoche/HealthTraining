import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as fontawesome from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'lds-product-list',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  fa = fontawesome;

  products: Products[] = [
    {
      id: 1,
      name: 'produto 1',
      price: 44.54

    },
    {
      id: 2,
      name: 'produto 2',
      price: 58.74

    },
    {
      id: 3,
      name: 'produto 3',
      price: 64.20

    },
    {
      id: 4,
      name: 'produto 4',
      price: 100.41

    },
  ];
}

export interface Products{
  id: number;
  name: String;
  price:number;
}
