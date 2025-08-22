import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../services/product.service';
import { CurrencyPipe } from '@angular/common';  // ✅ Importe le pipe

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CurrencyPipe  // ✅ Ajoute-le ici
  ],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id!).subscribe(product => {
        this.product = product;
      });
    }
  }
}