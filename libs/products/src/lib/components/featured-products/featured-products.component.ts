import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [];
  endSubs$: Subject<any> = new Subject();
  
  constructor(private prodService: ProductsService) { }

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

  // Get: Featured products 
  private _getFeaturedProducts() {
    this.prodService
      .getFeaturedProducts(8) // veritabanından Featured ürünlerinin ne kadar gelmesini istediğimizi yazıyoruz ve bunu {count} ile sağlıyoruz
      .pipe(takeUntil(this.endSubs$))
      .subscribe((products) => {
        this.featuredProducts = products;
      });
  }

}
