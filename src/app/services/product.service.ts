import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Définis l'interface Product directement ici (ou tu peux la mettre dans models plus tard)
export interface Product {
  id: number;
  nom: string;
  description: string;
  prix: number;
  categorie: string;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      nom: 'Laptop Gamer',
      description: 'PC portable puissant pour jeux',
      prix: 1500,
      categorie: 'Électronique',
      stock: 8
    },
    {
      id: 2,
      nom: 'Souris sans fil',
      description: 'Souris ergonomique Bluetooth',
      prix: 45,
      categorie: 'Accessoire',
      stock: 25
    }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);

  constructor() { }

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  getProductById(id: number): Observable<Product | undefined> {
  return new Observable(subscriber => {
    const product = this.products.find(p => p.id === id);
    subscriber.next(product);
    subscriber.complete();
  });
}

  addProduct(product: Omit<Product, 'id'>): Observable<Product> {
    const newProduct = { ...product, id: this.generateId() };
    this.products.push(newProduct);
    this.emitProducts();
    return new Observable(subscriber => {
      subscriber.next(newProduct);
      subscriber.complete();
    });
  }

  updateProduct(id: number, updatedProduct: Product): Observable<Product> {
    this.products = this.products.map(p => p.id === id ? updatedProduct : p);
    this.emitProducts();
    return new Observable(subscriber => {
      subscriber.next(updatedProduct);
      subscriber.complete();
    });
  }

  deleteProduct(id: number): Observable<void> {
    this.products = this.products.filter(p => p.id !== id);
    this.emitProducts();
    return new Observable(subscriber => {
      subscriber.next();
      subscriber.complete();
    });
  }

  private emitProducts(): void {
    this.productsSubject.next([...this.products]);
  }

  private generateId(): number {
    return this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
  }
}