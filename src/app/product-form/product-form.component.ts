import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode: boolean = false;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the product form group
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id'));
      if (this.productId) {
        this.isEditMode = true;
        this.loadProduct();
      }
    });
  }

  loadProduct() {
    this.productService.getProduct(this.productId).subscribe((product) => {
      this.productForm.patchValue({
        name: product.name,
        price: product.price,
      });
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      if (this.isEditMode) {
        this.productService
          .updateProduct(this.productId, formData)
          .subscribe(() => this.router.navigate(['/']));
      } else {
        this.productService
          .createProduct(formData)
          .subscribe(() => this.router.navigate(['/']));
      }
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
