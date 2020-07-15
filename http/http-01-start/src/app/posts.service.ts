import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {

    error = new Subject<string>();

    constructor(private http: HttpClient) { }



    createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content };

        // Send Http request
        this.http
            .post<{ name: string }>(
                'https://ng-complete-guide-28728.firebaseio.com/posts.json',
                postData,
                {
                    observe: 'response'
                }
            )
            .subscribe(responseData => {
                console.log(responseData.body);
            }, (error: HttpErrorResponse) => {
                this.error.next(error.message)
            });
    }

    fetchPosts() {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('pretty', 'print');
        searchParams = searchParams.append('lookAt', 'this');
        
        return this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-28728.firebaseio.com/posts.json', 
        {
            headers: new HttpHeaders({"Custom-Header": "hello"}),
            params: searchParams
        })
            .pipe(
                map(responseData => {
                    const postsArray: Post[] = [];
                    for (const key in responseData) {
                        postsArray.push({ ...responseData[key], id: key });
                    }

                    return postsArray;
                }), 
                catchError(errorRes => {
                    return throwError(errorRes);
                }));
    }

    deletePosts() {
        return this.http.delete('https://ng-complete-guide-28728.firebaseio.com/posts.json', {
            observe: 'events'
        }).pipe(tap(event => {
            if(event.type === HttpEventType.Response) {
                console.log(event.body);
            }
        }));
    }
}