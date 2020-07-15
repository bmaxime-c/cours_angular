import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post<{name:string}>(
        'https://ng-complete-guide-28728.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  fetchPosts() {
    this.http.get<{[key:string]: Post}>('https://ng-complete-guide-28728.firebaseio.com/posts.json')
      .pipe(map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          postsArray.push({ ...responseData[key], id: key });
        }

        return postsArray;
      }))
      .subscribe(posts => {
        console.log(posts[0].id);
      });
  }
}
