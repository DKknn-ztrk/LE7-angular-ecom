import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrdersModule } from "@keoshop/orders";
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule, Routes } from "@angular/router";
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import {RatingModule} from 'primeng/rating';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { FormsModule } from "@angular/forms";
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { UiModule } from '@keoshop/ui';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'category/:categoryid',
    component: ProductsListComponent
  },
  {
    path: 'products/:productid',
    component: ProductDetailComponent
  }
]

@NgModule({
    imports: [
      CommonModule, 
      OrdersModule, 
      RouterModule.forChild(routes), 
      ButtonModule, 
      CheckboxModule, 
      FormsModule, 
      RatingModule, 
      InputNumberModule,
      UiModule
    ],
    declarations: [
      ProductsSearchComponent,
      CategoriesBannerComponent,
      ProductItemComponent,
      FeaturedProductsComponent,
      ProductsListComponent,
      ProductDetailComponent
    ],
    exports: [
      ProductsSearchComponent,
      CategoriesBannerComponent,
      ProductItemComponent,
      FeaturedProductsComponent,
      ProductsListComponent,
      ProductDetailComponent
    ]
})
export class ProductsModule {}
