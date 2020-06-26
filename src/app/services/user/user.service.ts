import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient
  ) { }

  async getById(id: string) {
    const url = 'https://jsonplaceholder.typicode.com/users/' + id;
    return await this._http.get(url).pipe(first()).toPromise();
  }
}
