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
}