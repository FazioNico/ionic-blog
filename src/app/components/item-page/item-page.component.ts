import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/posts/post.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPageComponent {

  post: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _api: PostService
  ) { }
  
  async ionViewWillEnter() {
    console.log('ionViewWillEnter');
    // search current ID
    const {id = null} = this._route.snapshot.params;
    if (!id) return;
    const item = await this._api.getItemById(id);
    if (!item) return this._router.navigate(['../']);
    this.post = item;
  }

}
