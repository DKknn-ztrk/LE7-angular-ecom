import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@keoshop/users';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { ShellComponent } from './shared/shell/shell.component';

const routes: Routes = [
    { 
        path: '', component: ShellComponent,
        // AuthGuardService ile Kullanıcı login olmuş mu? token ı var mı? 
        // exp -> süresi dolmuşmu, gibi kontrol etmesini ve login değilse tokenı yok ise 
        // Ana dizin ve diğer children dizinlerine erişmemesini engelliyoruz
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'categories',
                component: CategoriesListComponent
            },
            {
                path: 'categories/form',
                component: CategoriesFormComponent
            },
            {
                path: 'categories/form/:id',
                component: CategoriesFormComponent
            },
            {
                path: 'products',
                component: ProductsListComponent
            },
            {
                path: 'products/form',
                component: ProductsFormComponent
            },
            {
                path: 'products/form/:id',
                component: ProductsFormComponent
            },
            {
                path: 'users',
                component: UsersListComponent
            },
            {
                path: 'users/form',
                component: UsersFormComponent
            },
            {
                path: 'users/form/:id',
                component: UsersFormComponent
            },
            {
                path: 'orders',
                component: OrdersListComponent
            },
            {
                path: 'orders/:id',
                component: OrdersDetailComponent
            }
        ],
    },
    {
        // TODO: 404 not found sayfası ve anasayfaya yönlendirme butonu eklenicek
        // tokeni yoksa giriş yapması için login ekranına gönder
        // ** ile Routes kısmanda Tanımlanmamış bir urlden istek geldiğinde nereye yönlendirileceğine karar veriyoruz
        // Bu sayfa 404 notfound kayboldunuz galiba tarzında bir sayfa olabilir ve anasayfaya yönlendirilebilir
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class AppRoutingModule { }
