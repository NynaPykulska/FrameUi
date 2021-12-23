import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {concatMap, delay, Observable, of, retryWhen, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RetryInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retryWhen((error) =>
        error.pipe(
          concatMap((err, count) => {
            if (count < 10 && err.status === 503) {
              console.error(`Server unreachable, retry ${count}. Message: `, err.message);
              return of(err);
            }
            return throwError(err);
          }),
          delay(2000),
        ),
      )
    )
  }
}
