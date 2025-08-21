import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';  // ✅ Import

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink  // ✅ Ajouté ici
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  productCount = 0;
  totalStock = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.productCount = products.length;
      this.totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    });
  }
}