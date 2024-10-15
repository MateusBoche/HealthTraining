import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../../../../domain/model/product.model';
import { ProductReadService } from '../../../../services/product/product-read.service';
import { ProductUpdateService } from '../../../../services/product/product-update.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {

  form: FormGroup;

  productId: string = "-1";

  nameMinChar: number = 3;
  nameMaxChar: number = 10;
  priceMinValue: number = 1;
  priceMaxValue: number = 500;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private productReadService: ProductReadService,
    private productUpdateService: ProductUpdateService) {

    this.initializeForm();
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.loadProductById(this.productId);
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(this.nameMinChar), Validators.maxLength(this.nameMaxChar)]],
      price: ['', [Validators.required, Validators.min(this.priceMinValue), Validators.max(this.priceMaxValue)]],
    });
  }

  async loadProductById(productId: string) {
    let product = await this.productReadService.findById(Number(productId));
    this.form.controls['name'].setValue(product.name);
    this.form.controls['price'].setValue(product.price);
  }

  async update() {
    const product: Product = {
      id: Number(this.productId),
      name: this.form.controls['name'].value,
      price: this.form.controls['price'].value,
    }

    console.log(product);

    try {
      await this.productUpdateService.update(String(product.id!), product.name, product.price);
      this.toastr.success('Dados salvos com sucesso!');
      this.router.navigate(['product/list']);
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  validateFields() {
    return this.form.controls['name'].valid
      && this.form.controls['price'].valid;
  }

}
