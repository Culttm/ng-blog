import {ChangeDetectionStrategy, Component} from '@angular/core';
import {catchError, map, Observable, of, startWith, switchMap, combineLatest} from "rxjs";
import {Post, State} from "../models";
import {BlogService} from "../services/blog.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {
  constructor(private readonly blogService: BlogService, private readonly route: ActivatedRoute) {
  }

  state$: Observable<State<Post | null>> = combineLatest([this.route.paramMap]).pipe(
    switchMap(([params]) => this.blogService.getPost(+(params.get('id') ?? 0)).pipe(
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
}
