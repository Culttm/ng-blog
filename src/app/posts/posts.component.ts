import {ChangeDetectionStrategy, Component} from '@angular/core';
import {catchError, combineLatest, map, Observable, of, startWith, Subject, switchMap} from "rxjs";
import {Posts, State} from "../models";
import {BlogService} from "../services/blog.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent {

  private _reload = new Subject<void>();

  constructor(private readonly blogService: BlogService, private readonly route: ActivatedRoute) {
  }

  state$: Observable<State<Posts | null>> = combineLatest([this.route.queryParamMap, this._reload.pipe(startWith(null))]).pipe(
    switchMap(() => this.blogService.getPosts().pipe(
      map((data) => ({
        data,
        process: false,
        error: false
      })),
      catchError((err) => of({
        data: null,
        process: false,
        error: err
      })),
      startWith({
        data: null,
        process: true,
        error: false
      })
    )),
  )

  reload() {
    this._reload.next()
  }
}
