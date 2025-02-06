import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor() {}

  async getProducts(): Promise<any> {
    return (await fetch(this.apiUrl)).json() ?? [];
  }
}
