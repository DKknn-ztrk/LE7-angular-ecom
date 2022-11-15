import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartService } from "./services/cart.service";
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { RouterModule, Routes } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { InputNumberModule } from "primeng/inputnumber";
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from 'primeng/dropdown';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthGuard } from "@keoshop/users";

const routes: Routes = [
    {
      path: 'cart',
      component: CartPageComponent
    },
    {
      path: 'checkout',
      // TODO: login için guest hesap açtık fakat onunla checkout yaptıgımızda işleme devam etmiyor yine logine atıyor kontrol et
      // james yeni ile sorun yok
      // ne farklı ikisi arasında.
      canActivate: [AuthGuard],
      component: CheckoutPageComponent
    },
    {
      path: 'success',
      component: ThankYouComponent
    }
  ];

@NgModule({
    imports: [
        CommonModule,
        BadgeModule,
        RouterModule.forChild(routes),
        ButtonModule,
        InputNumberModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        InputMaskModule,
        DropdownModule
    ],
    providers: [],
    declarations: [
      CartIconComponent,
      CartPageComponent,
      OrderSummaryComponent,
      CheckoutPageComponent,
      CartPageComponent,
      OrderSummaryComponent,
      CheckoutPageComponent,
      ThankYouComponent
    ],
    exports: [
        CartIconComponent,
        CartPageComponent,
        OrderSummaryComponent,
        CheckoutPageComponent,
        CartPageComponent, 
        OrderSummaryComponent, 
        ThankYouComponent
    ]
})
export class OrdersModule {
    constructor(cartService: CartService) {
        cartService.initCartLocalStorage();
    }
}
