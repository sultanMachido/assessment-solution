import { Component } from '@angular/core';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';

@Component({
  selector: 'app-root',
  imports: [ProductCatalogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-product-catalog';
}
