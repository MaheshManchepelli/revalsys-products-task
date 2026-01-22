import { Component, OnInit, inject, signal, ChangeDetectionStrategy, Inject } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink, UpperCasePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private seo = inject(SeoService);

  // Signal
  product = signal<Product | null>(null);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
  
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data) => {
          this.product.set(data);
          this.isLoading.set(false);
          
          // SEO : dynamic Title and Description from Product data
          if (data) {
          this.seo.updateMetadata({
            title: `${data.title} - Revalsys Store`,
            description: data.description,
            image: data.image,
            type: 'product'
          });
        }
        },
        error: (err) => {       
          this.isLoading.set(false);
        }
      });
    }
  }
}