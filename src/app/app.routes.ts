import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path : '',
        loadComponent: () => import('./core/features/product-listing/product-listing.component').then(m => m.ProductListingComponent)
    },
    
    {
        path : 'product/:id',
        loadComponent: () => import('./core/features/product-details/product-details.component').then(m => m.ProductDetailsComponent)
    }
];
