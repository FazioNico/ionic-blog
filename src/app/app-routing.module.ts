import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogPageComponent } from './features/home/components/blog-page/blog-page.component';
import { ItemPageComponent } from './features/detail/components/item-page/item-page.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
      },
      {
        path: ':id',
        loadChildren: () => import('./features/detail/detail.module').then(m => m.DetailModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
