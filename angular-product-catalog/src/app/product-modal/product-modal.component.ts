import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../products/products.model';

@Component({
  selector: 'app-product-modal',
  imports: [],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
})
export class ProductModalComponent {
  @Input() product!: Product;
  @Output() close = new EventEmitter<void>();
  closeModal() {
    this.close.emit();
  }
}
