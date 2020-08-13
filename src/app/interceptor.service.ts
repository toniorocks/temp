import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		let token: any = localStorage.getItem('aiti-token');
		if (token) {

			token = JSON.parse(token);
			req = req.clone({
				setHeaders: {
					'client-id': '123',
					'secret-id': '123',
					'x-token': '123',
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token.access_token,
					'Access-Control-Allow-Methods': '*'
				}
			});

		}

		return next.handle(req).pipe(retry(2), catchError((error: HttpErrorResponse) => {
			if (error.status == 423) {
				localStorage.removeItem('customer');
				location.reload();
			}
			return throwError(error.error.notification.message);
		}));

	}

	constructor() { }
}
