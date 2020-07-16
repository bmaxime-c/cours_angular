import { HttpRequest, HttpEvent, HttpInterceptor, HttpHandler, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Request is on his way:');
        const modifiedReq = req.clone({
            headers: req.headers
            .set('Auth', 'xyz')
        });
        
        return next.handle(modifiedReq).pipe(tap(event => {
            if(event.type === HttpEventType.Response) {
                console.log('Response arrived, body data : ')
                console.log(event.body);
            }
        }));
    }

}