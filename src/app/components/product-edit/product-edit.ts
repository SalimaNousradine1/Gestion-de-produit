import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFormComponent } from '../product-form/product-form';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFormComponent],
  templateUrl: './product-edit.html'
})
export class ProductEditComponent implements OnInit {
  productId!: number;
  product = { name: '', description: '', price: 0, category: '', stock: 0 };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    // ⚡ Ici tu devrais charger le produit depuis ton service/API
    // Pour l'exemple :
    this.product = { name: 'Laptop Gamer', description: 'PC puissant', price: 1500, category: 'Électronique', stock: 10 };
  }

  updateProduct() {
    alert('Produit modifié (id=' + this.productId + ') : ' + JSON.stringify(this.product));
    this.router.navigate(['/products']); // retour à la liste
  }
}
