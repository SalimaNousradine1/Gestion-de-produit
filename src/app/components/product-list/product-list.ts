import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../services/product.service';
import { NgFor } from '@angular/common';           // ✅ Pour *ngFor
import { CurrencyPipe } from '@angular/common';   // ✅ Pour | currency
import { AsyncPipe } from '@angular/common';      // ✅ Pour | async
import { RouterLink } from '@angular/router';     // ✅ Pour routerLink

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgFor,           // ✅
    CurrencyPipe,    // ✅
    AsyncPipe,       // ✅ Ajouté ici !
    RouterLink       // ✅
  ],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductListComponent implements OnInit {
  products$: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  deleteProduct(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        alert('Produit supprimé avec succès !');
      });
    }
  }
}