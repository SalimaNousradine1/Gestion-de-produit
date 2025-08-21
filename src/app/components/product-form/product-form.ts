import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../services/product.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      prix: [0, [Validators.required, Validators.min(0.01)]],
      categorie: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.productService.getProductById(+id).subscribe(product => {
        if (product) {
          this.productForm.patchValue(product);
        } else {
          alert('Produit non trouvé !');
          this.router.navigate(['/products']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const product = this.productForm.value;
    const id = this.route.snapshot.paramMap.get('id');

    if (this.isEdit && id) {
      this.productService.updateProduct(+id, product).subscribe(() => {
        alert('Produit mis à jour avec succès !');
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.addProduct(product).subscribe(() => {
        alert('Produit ajouté avec succès !');
        this.router.navigate(['/products']);
      });
    }
  }
}