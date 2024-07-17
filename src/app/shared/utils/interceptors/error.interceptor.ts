import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly snackbarService: SnackbarService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          return this.returnError(err.status);
        }
        this.snackbarService.displayError();
        return EMPTY;
      }),
    );
  }

  private returnError(status: number) {
    return of(new HttpResponse({ status, body: null }));
  }
}
