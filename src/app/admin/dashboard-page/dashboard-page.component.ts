import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../shared/posts.service';
import { Post } from '../../shared/interfaces';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  private unsubscriber: Subject<void> = new Subject<void>();
  posts: Post[] = [];
  searchStr = '';


  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getAll()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(posts => {
      this.posts = posts;
    });
  }

  remove(id: string) {
    this.postsService.remove(id)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
    });
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
