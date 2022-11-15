import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@keoshop/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSubs$ : Subject<any> = new Subject();
  
  constructor(
    private categoriesService: CategoriesService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this._getCategories();
  }
  
  ngOnDestroy() {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Kategori silme işlemine devam etmek istiyor musunuz??',
      header: 'Kategoriyi Sil',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).pipe(takeUntil(this.endSubs$))
        .subscribe(() => {
          this._getCategories();
          this.messageService.add({severity:'success', summary:'Başarılı', detail:'Kategori başarıyla silindi'});
        },()=> {
          this.messageService.add({severity:'error', summary:'Hata', detail:'Hay aksi! Kategori silinemedi, bir hata meydana geldi.'});
        });
      }
  });
  }

  updateCategory(categoryid: string) {
    this.router.navigateByUrl(`categories/form/${categoryid}`);
  }

  private _getCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe((cats) => {
      this.categories = cats;
    });
  }
}
