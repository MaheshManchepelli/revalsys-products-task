import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { Title, Meta } from '@angular/platform-browser';
import { SeoService } from '../../services/seo.service';


@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.scss'
})
export class ProductListingComponent implements OnInit {

  private productService = inject(ProductService);
  private seo = inject(SeoService);

  // Signal used here to hold products
  products = signal<Product[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    // SEO : Dynamic Page Title and Meta description
    this.seo.updateMetadata({
      title: 'Premium Product Store | Revalsys',
      description: 'Explore our wide range of high-quality products.',
      image: 'https://fakestoreapi.com/icons/logo.png' // Fallback previw image for listing page
    });

    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching products', err);
        this.isLoading.set(false);
      }
    });
  }
}
