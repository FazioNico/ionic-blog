import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private _http: HttpClient
  ) { }

  async getByPostId(id: string) {
    const url = 'https://jsonplaceholder.typicode.com/posts/' + id + '/comments';
    return await this._http.get(url).pipe(first()).toPromise();
  }
}
