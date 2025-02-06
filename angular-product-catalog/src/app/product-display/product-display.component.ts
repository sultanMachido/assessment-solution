import { Component, Input } from '@angular/core';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { Product } from '../products/products.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-display',
  imports: [ProductModalComponent, NgIf],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.scss',
})
export class ProductDisplayComponent {
  @Input() product!: Product;

  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
