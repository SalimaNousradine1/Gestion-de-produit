import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFormComponent } from '../product-form/product-form';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFormComponent],
  templateUrl: './product-add.html'
})
export class ProductAddComponent {
  product = { name: '', description: '', price: 0, category: '', stock: 0 };

  constructor(private router: Router) {}

  saveProduct() {
    // Ici tu peux envoyer les données à un service ou API
    alert('Produit ajouté : ' + JSON.stringify(this.product));
    this.router.navigate(['/products']); // retour à la liste
  }
}

