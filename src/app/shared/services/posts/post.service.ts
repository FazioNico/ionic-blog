import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { CommentsService } from '../comments/comments.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _posts$: BehaviorSubject<any> = new BehaviorSubject(null);
  public posts$: Observable<any> = this._posts$.asObservable();

  constructor(
    private _http: HttpClient,
    private _usersService: UserService,
    private _commentServcie: CommentsService,
    private _alert: AlertController
  ) { }

  async load() {
    // build url
    const url = 'https://jsonplaceholder.typicode.com/posts';
    // do request and await response
    const posts = await this._http.get(url).pipe(first())
      .toPromise() // Observable as promise
      .catch(async (err) => {
        // alert
        await this._displayAlert(err.message);
        // return null to manage UI
        return null;
      });
    // handle response null
    if (!posts) return this._posts$.next([]);
    // assignation
    this._posts$.next(posts);
  }

  async getItemById(id: string) {
    const data = this._posts$.value;
    if (!data) await this.load();
    const post = this._posts$.value.find(el => el.id === +id);
    if (!post) return;
    // load user data
    const user = await this._usersService.getById(id).catch(err => err);
    // load comments
    const comments = await this._commentServcie.getByPostId(id).catch(err => err);
    // creat new object with all responses
    return {
      ...post,
      user,
      comments
    };
  }

  async update(data) {
    const url = 'https://jsonplaceholder.typicode.com/posts/' + data.id;
    const updatePost = await this._http.put<{id: number}>(url, data).pipe(first()).toPromise();
    this._posts$.next([
      ...this._posts$.value.filter(post => post.id !== updatePost.id),
      updatePost
    ]);
  }

  async create(data) {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const newPost = await this._http.post<{id?: string}>(url, data).pipe(first()).toPromise().catch(err => err);
    if (!newPost?.id) return;
    this._posts$.next([
      newPost,
      ...this._posts$.value
    ]);
  }

  // we can create an other service to split alert logic
  // and then inject in each services
  private async _displayAlert(message: string) {
    const ionAlert = await this._alert.create({
      header: 'Error',
      message,
      buttons: ['ok']
    });
    await ionAlert.present();
  }
}
