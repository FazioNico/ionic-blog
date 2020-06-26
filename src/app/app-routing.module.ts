import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { ItemPageComponent } from './components/item-page/item-page.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BlogPageComponent
      },
      {
        path: ':id',
        component: ItemPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
