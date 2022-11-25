import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post, Posts} from "../models";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  static BASE_URL = 'https://jsonplaceholder.typicode.com'

  constructor(private readonly httpClient: HttpClient) {
  }

  getPosts(): Observable<Posts> {
    return this.httpClient.get<Posts>(`${BlogService.BASE_URL}/posts?_limit=2`)
  }

  getPost(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${BlogService.BASE_URL}/posts/${id}`)
  }
}
