import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './interfaces';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { FbCreateResponse } from './interfaces';


@Injectable({providedIn: 'root'})
export class PostsService {
  constructor(private http: HttpClient) {
  }

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbDBUrl}/posts.json`, post)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        };
      }));
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbDBUrl}/posts.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }));
      }));

    // .pipe(map((response: any) => response));
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDBUrl}/posts/${id}.json`);
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDBUrl}/posts/${id}.json`)
      .pipe(map((post: Post) => {
        return {
          ...post,
          id,
          date: new Date(post.date)
        };
      }));
  }
}
