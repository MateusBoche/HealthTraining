import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as fontawesome from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'lds-product-list',
  standalone: true,
  imports: [
    FontAwesomeModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  fa = fontawesome;

}
