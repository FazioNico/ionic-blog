import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/posts/post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

  posts$: Observable<any>;
  max = 10;

  constructor(
    private _api: PostService
  ) { }

  ngOnInit(): void {
    this._api.load();
    this.posts$ = this._api.posts$;
  }

  loadMore($event) {
    // calcul new maximum
    this.max = this.max + 10;
    // trigger complete() event to stop infini scroll animation and display new items
    $event.target.complete();
  }
}
