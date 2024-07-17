import type { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { catchError, of, throwError } from 'rxjs';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

export const errorInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const snackbarService: SnackbarService = inject(SnackbarService);

  return next(request).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        return returnError(error.status);
      }

      snackbarService.displayError();

      return throwError(() => error);
    }),
  );
};

function returnError(status: number): Observable<HttpResponse<unknown>> {
  return of(new HttpResponse({ status, body: null }));
}
