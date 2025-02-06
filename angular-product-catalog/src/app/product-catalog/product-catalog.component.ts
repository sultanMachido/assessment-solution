import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ProductService } from '../products/products.service';
import { Product } from '../products/products.model';
import { ProductDisplayComponent } from '../product-display/product-display.component';

@Component({
  selector: 'app-product-catalog',
  imports: [ReactiveFormsModule, NgFor, ProductDisplayComponent],
  templateUrl: './product-catalog.component.html',
  styleUrl: './product-catalog.component.scss',
})
export class ProductCatalogComponent {
  isLoading = true;

  searchForProducts = new FormControl('');
  searchByCategory = new FormControl('');
  minPrice = new FormControl('');
  maxPrice = new FormControl('');

  private productsService = inject(ProductService);
  productList: Product[] = [];
  filteredProducts = this.productList;

  constructor() {
    this.searchForProducts.valueChanges.subscribe((searchTerm) => {
      if (searchTerm) {
        this.filterProducts(searchTerm);
      } else {
        this.filteredProducts = this.productList;
      }
    });

    this.searchByCategory.valueChanges.subscribe((searchTerm) => {
      if (searchTerm) {
        this.filterProducts(searchTerm, 'category');
      } else {
        this.filteredProducts = this.productList;
      }
    });

    this.minPrice.valueChanges.subscribe((searchTerm) => {
      if (searchTerm) {
        if (this.maxPrice.value) {
          console.log(searchTerm, 'searchTerm 3');
          this.filterProductsByPriceRange(
            Number(searchTerm),
            Number(this.maxPrice.value)
          );
          return;
        }
        this.filterProducts(searchTerm, 'minPrice');
      } else {
        this.filteredProducts = this.productList;
      }
    });

    this.maxPrice.valueChanges.subscribe((searchTerm) => {
      if (searchTerm) {
        if (this.minPrice.value) {
          this.filterProductsByPriceRange(
            Number(this.minPrice.value),
            Number(searchTerm)
          );
          return;
        }
        this.filterProducts(searchTerm, 'maxPrice');
      } else {
        this.filteredProducts = this.productList;
      }
    });

    this.productsService.getProducts().then((product) => {
      if (product) {
        this.isLoading = false;
      }
      this.productList = product.products;
      this.filteredProducts = this.productList;
    });
  }

  filterProductsByPriceRange(minPrice: number, maxPrice: number) {
    this.filteredProducts = this.productList.filter(
      (product: { [key: string]: any }) =>
        product['price'] >= minPrice && product['price'] <= maxPrice
    );
  }

  filterProducts(searchTerm: string, searchBy?: string) {
    if (searchBy === 'minPrice') {
      this.filteredProducts = this.filteredProducts.filter(
        (product: { [key: string]: any }) => product['price'] >= searchTerm
      );
      return;
    }
    if (searchBy === 'maxPrice') {
      this.filteredProducts = this.filteredProducts.filter(
        (product: { [key: string]: any }) => product['price'] <= searchTerm
      );
      return;
    }
    if (searchBy === 'category') {
      this.filteredProducts = this.productList.filter(
        (product: { [key: string]: any }) =>
          product['category'].toLowerCase().includes(searchTerm.toLowerCase())
      );
      return;
    }

    this.filteredProducts = this.filteredProducts.filter(
      (product: { [key: string]: any }) =>
        product['title'].toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
